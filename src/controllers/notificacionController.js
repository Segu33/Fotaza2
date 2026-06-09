const db = require("../models");

const listar = async (req, res) => {

  try {

    if (!req.session.user) {

      return res.redirect("/login");

    }

    const userId = req.session.user.id;

    await db.Notificacion.update(
      { leida: true },
      {
        where: {
          user_id: userId,
          leida: false
        }
      }
    );

    const notificaciones = await db.Notificacion.findAll({

      where: {
        user_id: userId
      },

      include: [
        {
          model: db.User,
          as: "actor"
        }
      ],

      order: [
        ["createdAt", "DESC"]
      ]

    });

    res.render("notificaciones/index", {
      notificaciones
    });

  } catch (error) {

    console.error(error);

    res.send("Error cargando notificaciones");

  }

};
const abrirNotificacion = async (req, res) => {

  try {

    const notificacion =
    await db.Notificacion.findByPk(
      req.params.id
    );

    if (!notificacion) {

      return res.redirect(
        "/publicaciones"
      );

    }

    await notificacion.update({
      leida: true
    });

    if (notificacion.publicacion_id) {

      return res.redirect(
        `/publicaciones/${notificacion.publicacion_id}`
      );

    }

    res.redirect("/publicaciones");

  }
  catch (error) {

    console.error(error);

    res.redirect("/publicaciones");

  }

};

module.exports = {
  listar, abrirNotificacion
};