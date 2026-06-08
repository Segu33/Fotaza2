const db = require("../models");

module.exports = async (req, res, next) => {

  res.locals.session = req.session;
  res.locals.notificaciones = [];

  try {

    if (req.session.user) {

      const notificaciones = await db.Notificacion.findAll({

        where: {
          user_id: req.session.user.id,
          leida: false
        },

        include: [
          {
            model: db.User,
            as: "actor"
          }
        ],

        order: [["id", "DESC"]],
        limit: 5

      });

      res.locals.notificaciones = notificaciones;

    }

  } catch (error) {

    console.error(error);

  }

  next();

};