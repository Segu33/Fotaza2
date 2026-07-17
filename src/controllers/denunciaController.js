const db = require("../models");
const { crearNotificacion } = require("../helpers/notificacionHelper");

// ==========================================
// Mostrar formulario de denuncia
// ==========================================

const formularioDenuncia = async (req, res) => {

  try {

    const imagen = await db.Imagen.findByPk(req.params.imagen_id);

    if (!imagen) {
      return res.redirect("/publicaciones");
    }

    res.render("denuncias/crear", {
      imagen_id: imagen.id,
      publicacion_id: imagen.publicacion_id
    });

  } catch (error) {

    console.error(error);
    res.redirect("/publicaciones");

  }

};

// ==========================================
// Crear denuncia
// ==========================================

const crearDenuncia = async (req, res) => {

  try {

    if (!req.session.user) {
      return res.redirect("/login");
    }

    const {
      imagen_id,
      publicacion_id,
      motivo,
      descripcion
    } = req.body;

    const userId = req.session.user.id;

    // Verificar si el usuario ya denunció esta imagen
    const existe = await db.Denuncia.findOne({
      where: {
        user_id: userId,
        imagen_id
      }
    });

    if (existe) {

      req.session.mensaje = {
        tipo: "warning",
        texto: "Ya denunciaste esta publicación."
      };

      return res.redirect(`/publicaciones/${publicacion_id}`);

    }

    // Crear denuncia
    await db.Denuncia.create({
      motivo,
      descripcion,
      user_id: userId,
      imagen_id
    });

    // Contar denuncias de la imagen
    const totalDenuncias = await db.Denuncia.count({
      where: {
        imagen_id
      }
    });

    // Si llega a 3 denuncias -> bloquear publicación
    if (totalDenuncias >= 3) {

      const imagen = await db.Imagen.findByPk(imagen_id);

      if (imagen) {

        const publicacion = await db.Publicacion.findByPk(
          imagen.publicacion_id
        );

        if (publicacion) {

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

    }

    // Mensaje de éxito
    req.session.mensaje = {
      tipo: "success",
      texto: "Su reporte ha sido enviado para revisión."
    };

    return res.redirect(`/publicaciones/${publicacion_id}`);

  } catch (error) {

    console.error(error);
    res.send("Error al denunciar");

  }

};

module.exports = {
  formularioDenuncia,
  crearDenuncia
};