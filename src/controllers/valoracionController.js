const db = require("../models");

const toggleLike = async (req, res) => {
  try {
    const { imagen_id } = req.body;
    const userId = req.session.user.id;
    // Buscar si ya existe like
    const existe = await db.Valoracion.findOne({
      where: {
        user_id: userId,
        imagen_id,
      },
    });

    if (existe) {
      // Quitar like
      await existe.destroy();
    } else {
      // Crear like
      await db.Valoracion.create({
        user_id: userId,
        imagen_id,
        puntuacion: 1,
      });
    }

    res.redirect("/publicaciones");
  } catch (error) {
    console.error(error);
    res.send("Error en like");
  }
};

module.exports = {
  toggleLike,
};