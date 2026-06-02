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

      where: busqueda
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
        : {},

      include: [
        {
          model: db.Imagen,
          as: "imagenes",
          include: [
            {
              model: db.Valoracion,
              as: "valoraciones",
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
    });

  } catch (error) {
    console.error(error);
    res.send("Error al cargar publicaciones");
  }
};

module.exports = {
  crearPublicacion,
  listarPublicaciones,
};