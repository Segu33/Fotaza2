const db = require("../models");

const crearComentario = async (req, res) => {
  try {
    const { texto, publicacion_id } = req.body;

    const userId = 1; // después lo cambiamos por sesión

    await db.Comentario.create({
      texto,
      user_id: userId,
      publicacion_id,
    });

    res.redirect("/publicaciones");
  } catch (error) {
    console.error(error);
    res.send("Error al comentar");
  }
};

module.exports = {
  crearComentario,
};