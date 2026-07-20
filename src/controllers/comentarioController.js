const db = require("../models");

const {
  crearNotificacion
} = require("../helpers/notificacionHelper");

const crearComentario = async (req, res) => {

  try {

    const {
      texto,
      publicacion_id
    } = req.body;

    const userId = req.session.user.id;

    // Buscar la publicación
    const publicacion = await db.Publicacion.findByPk(publicacion_id);

    if (!publicacion) {

      return res.send("Publicación no encontrada");

    }

    // Verificar si los comentarios están habilitados
    if (!publicacion.comentarios_habilitados) {

      return res.redirect(req.get("Referer") || "/publicaciones");

    }

    await db.Comentario.create({

      texto,

      user_id: userId,

      publicacion_id

    });

    // Crear notificación al dueño de la publicación
    await crearNotificacion({

      receptorId: publicacion.user_id,

      actorId: userId,

      tipo: "comentario",

      publicacionId: publicacion.id

    });

    res.redirect(req.get("Referer") || "/publicaciones");

  } catch (error) {

    console.error(error);

    res.send("Error al comentar");

  }

};

const eliminarComentario = async (req, res) => {

  try {

    const comentario = await db.Comentario.findByPk(req.params.id, {

      include: [
        {
          model: db.Publicacion,
          as: "publicacion"
        }
      ]

    });

    if (!comentario) {

      return res.redirect(req.get("Referer") || "/publicaciones");

    }

    if (comentario.publicacion.user_id !== req.session.user.id) {

      return res.status(403).send("No autorizado");

    }

    await comentario.destroy();

    res.redirect(req.get("Referer") || "/publicaciones");

  } catch (error) {

    console.error(error);

    res.redirect(req.get("Referer") || "/publicaciones");

  }

};

module.exports = {

  crearComentario,
  eliminarComentario

};