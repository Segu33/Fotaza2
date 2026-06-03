const db = require("../models");
const { crearNotificacion } = require("../helpers/notificacionHelper");
const crearDenuncia = async (req, res) => {

  try {

    if (!req.session.user) {
      return res.redirect("/login");
    }

    const { imagen_id, motivo, descripcion } = req.body;

    const userId = req.session.user.id;

    const existe = await db.Denuncia.findOne({
      where: {
        user_id: userId,
        imagen_id
      }
    });

    if (existe) {
      return res.redirect("/publicaciones");
    }

    await db.Denuncia.create({
      motivo,
      descripcion,
      user_id: userId,
      imagen_id
    });

    // CONTAR DENUNCIAS DE ESA IMAGEN
    const totalDenuncias = await db.Denuncia.count({
      where: {
        imagen_id
      }
    });

    // SI LLEGA A 3 -> BLOQUEAR PUBLICACIÓN
    if (totalDenuncias >= 3) {

  const imagen = await db.Imagen.findByPk(imagen_id);

  if (imagen) {

    const publicacion = await db.Publicacion.findByPk(
      imagen.publicacion_id
    );

    await publicacion.update({
      bloqueada: true
    });

    await crearNotificacion({

      receptorId: publicacion.user_id,
      actorId: userId,
      tipo: "bloqueo"

    });

    console.log("🚫 Publicación bloqueada por exceso de denuncias");
  }
}

    res.redirect("/publicaciones");

  } catch (error) {

    console.error(error);
    res.send("Error al denunciar");

  }

};

module.exports = {
  crearDenuncia
};