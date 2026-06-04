const db = require("../models");
const { Op } = require("sequelize");

const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    const userId = req.session.user.id;

    const nuevaPublicacion = await db.Publicacion.create({
      titulo,
      descripcion,
      user_id: userId,
    });

    if (req.file) {
      await db.Imagen.create({
        url: "/uploads/" + req.file.filename,
        licencia: "libre",
        publicacion_id: nuevaPublicacion.id,
      });
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
              ],
            }
          : {})
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

    const publicacion = await db.Publicacion.findByPk(
      req.params.id,
      {
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
        ],
      }
    );

    if (!publicacion) {
      return res.send("Publicación no encontrada");
    }

    const relacionadas = await db.Publicacion.findAll({

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
      ],

      limit: 8,

      order: db.sequelize.random(),

    });

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
  
module.exports = {
  crearPublicacion,
  listarPublicaciones,
  verPublicacion
};