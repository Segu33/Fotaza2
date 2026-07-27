const db = require("../models");
const { Op } = require("sequelize");

const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, etiquetas } = req.body;

    const userId = req.session.user.id;

    //=========================
    // CREAR PUBLICACIÓN
    //=========================

    const nuevaPublicacion = await db.Publicacion.create({
      titulo,
      descripcion,
      user_id: userId,
    });

    //=========================
    // IMAGEN
    //=========================

    if (req.file) {
      await db.Imagen.create({
        url: "/uploads/" + req.file.filename,
        licencia: "libre",
        publicacion_id: nuevaPublicacion.id,
      });
    }

    //=========================
    // ETIQUETAS
    //=========================

    if (etiquetas && etiquetas.trim() !== "") {
      const listaEtiquetas = [
        ...new Set(
          etiquetas
            .split(",")
            .map((e) => e.trim().toLowerCase())
            .filter((e) => e.length > 0)
        ),
      ];

      for (const nombre of listaEtiquetas) {
        let etiqueta = await db.Etiqueta.findOne({
          where: { nombre },
        });

        if (!etiqueta) {
          etiqueta = await db.Etiqueta.create({
            nombre,
          });
        }

        await nuevaPublicacion.addEtiqueta(etiqueta);
      }
    }

    res.redirect("/publicaciones");
  } catch (error) {
    console.error(error);
    res.send("Error al crear publicación");
  }
};

const listarPublicaciones = async (req, res) => {
  try {
    const busqueda = req.query.q || "";

    //=========================================
    // BUSCAR PUBLICACIONES POR ETIQUETAS
    //=========================================

    let idsPorEtiqueta = [];

    if (busqueda) {
      const etiquetas = await db.Etiqueta.findAll({
        where: {
          nombre: {
            [Op.like]: `%${busqueda}%`,
          },
        },
        include: [
          {
            model: db.Publicacion,
            as: "publicaciones",
            attributes: ["id"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      idsPorEtiqueta = [
        ...new Set(
          etiquetas.flatMap((etiqueta) =>
            etiqueta.publicaciones.map((publicacion) => publicacion.id)
          )
        ),
      ];
    }

    //=========================================
    // OBTENER PUBLICACIONES
    //=========================================

    const publicaciones = await db.Publicacion.findAll({
      where: {
        bloqueada: false,

        ...(busqueda
          ? {
              [Op.or]: [
                {
                  titulo: {
                    [Op.like]: `%${busqueda}%`,
                  },
                },
                {
                  descripcion: {
                    [Op.like]: `%${busqueda}%`,
                  },
                },
                ...(idsPorEtiqueta.length
                  ? [
                      {
                        id: {
                          [Op.in]: idsPorEtiqueta,
                        },
                      },
                    ]
                  : []),
              ],
            }
          : {}),
      },

      include: [
        {
          model: db.Imagen,
          as: "imagenes",
          include: [
            {
              model: db.Valoracion,
              as: "valoraciones",
            },
            {
              model: db.Favorito,
              as: "favoritos",
            },
          ],
        },
        {
          model: db.User,
          as: "usuario",
        },
        {
          model: db.Comentario,
          as: "comentarios",
          include: [
            {
              model: db.User,
              as: "usuario",
            },
          ],
        },
        {
          model: db.Etiqueta,
          as: "etiquetas",
          through: {
            attributes: [],
          },
        },
      ],

      order: [["id", "DESC"]],
    });

    res.render("publicaciones/index", {
      publicaciones,
      busqueda,
      session: req.session,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al cargar publicaciones");
  }
};
const verPublicacion = async (req, res) => {
  try {
    const publicacion = await db.Publicacion.findByPk(req.params.id, {
      include: [
        {
          model: db.Imagen,
          as: "imagenes",
          include: [
            {
              model: db.Valoracion,
              as: "valoraciones",
            },
            {
              model: db.Favorito,
              as: "favoritos",
            },
          ],
        },
        {
          model: db.User,
          as: "usuario",
        },
        {
          model: db.Comentario,
          as: "comentarios",
          include: [
            {
              model: db.User,
              as: "usuario",
            },
          ],
        },
        {
          model: db.Etiqueta,
          as: "etiquetas",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!publicacion) {
      return res.send("Publicación no encontrada");
    }

    // ===============================
// PUBLICACIONES RELACIONADAS
// (MISMAS ETIQUETAS)
// ===============================

const idsEtiquetas = publicacion.etiquetas.map(e => e.id);

let relacionadas = [];

if (idsEtiquetas.length > 0) {

  relacionadas = await db.Publicacion.findAll({

    where: {
      id: {
        [Op.ne]: publicacion.id,
      },
      bloqueada: false,
    },

    include: [
      {
        model: db.Imagen,
        as: "imagenes",
      },
      {
        model: db.Etiqueta,
        as: "etiquetas",
        where: {
          id: idsEtiquetas,
        },
        through: {
          attributes: [],
        },
      },
    ],

    distinct: true,

    limit: 8,

  });

}

// Si no encontró publicaciones con las mismas etiquetas,
// completa con publicaciones aleatorias.

if (relacionadas.length < 8) {

  const restantes = await db.Publicacion.findAll({

    where: {
      id: {
        [Op.notIn]: [
          publicacion.id,
          ...relacionadas.map(p => p.id),
        ],
      },
      bloqueada: false,
    },

    include: [
      {
        model: db.Imagen,
        as: "imagenes",
      },
    ],

    order: db.sequelize.random(),

    limit: 8 - relacionadas.length,

  });

  relacionadas = [...relacionadas, ...restantes];

}

    res.render("publicaciones/detalle", {
      publicacion,
      relacionadas,
      session: req.session,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al cargar publicación");
  }
};

const toggleComentarios = async (req, res) => {
  try {
    const publicacion = await db.Publicacion.findByPk(req.params.id);

    if (!publicacion) {
      return res.send("Publicación no encontrada");
    }

    if (publicacion.user_id !== req.session.user.id) {
      return res.status(403).send("No autorizado");
    }

    await publicacion.update({
      comentarios_habilitados: !publicacion.comentarios_habilitados,
    });

    res.redirect(`/publicaciones/${publicacion.id}`);
  } catch (error) {
    console.error(error);
    res.send("Error al actualizar comentarios");
  }
};
// =========================
// MOSTRAR EDITAR PUBLICACIÓN
// =========================

const mostrarEditarPublicacion = async (req, res) => {

  try {

    const publicacion = await db.Publicacion.findByPk(req.params.id, {

      include: [
        {
          model: db.Imagen,
          as: "imagenes"
        },
        {
          model: db.Etiqueta,
          as: "etiquetas"
        }
      ]

    });

    if (!publicacion) {
      return res.redirect("/publicaciones");
    }

    if (publicacion.user_id !== req.session.user.id) {
      return res.redirect(`/publicaciones/${publicacion.id}`);
    }

    res.render("publicaciones/editar", {

      publicacion,
      session: req.session

    });

  } catch (error) {

    console.error(error);
    res.send("Error cargando la publicación");

  }

};
// =========================
// EDITAR PUBLICACIÓN
// =========================

const editarPublicacion = async (req, res) => {

  try {

    const { titulo, descripcion, etiquetas } = req.body;

    const publicacion = await db.Publicacion.findByPk(req.params.id, {

      include: [
        {
          model: db.Imagen,
          as: "imagenes"
        }
      ]

    });

    if (!publicacion) {
      return res.redirect("/publicaciones");
    }

    if (publicacion.user_id !== req.session.user.id) {
      return res.redirect(`/publicaciones/${publicacion.id}`);
    }

    await publicacion.update({

      titulo,
      descripcion

    });

    // =========================
    // REEMPLAZAR IMAGEN (OPCIONAL)
    // =========================

    if (req.file) {

      if (publicacion.imagenes.length > 0) {

        await publicacion.imagenes[0].update({

          url: "/uploads/" + req.file.filename

        });

      } else {

        await db.Imagen.create({

          url: "/uploads/" + req.file.filename,
          licencia: "libre",
          publicacion_id: publicacion.id

        });

      }

    }

    // =========================
    // ACTUALIZAR ETIQUETAS
    // =========================

    await publicacion.setEtiquetas([]);

    if (etiquetas && etiquetas.trim() !== "") {

      const listaEtiquetas = [
        ...new Set(
          etiquetas
            .split(",")
            .map(e => e.trim().toLowerCase())
            .filter(e => e.length > 0)
        )
      ];

      for (const nombre of listaEtiquetas) {

        let etiqueta = await db.Etiqueta.findOne({

          where: { nombre }

        });

        if (!etiqueta) {

          etiqueta = await db.Etiqueta.create({

            nombre

          });

        }

        await publicacion.addEtiqueta(etiqueta);

      }

    }

    return res.redirect(`/publicaciones/${publicacion.id}`);

  } catch (error) {

    console.error(error);
    res.send("Error al editar la publicación");

  }

};

module.exports = {
  crearPublicacion,
  listarPublicaciones,
  verPublicacion,
  toggleComentarios,
  mostrarEditarPublicacion,
  editarPublicacion
};