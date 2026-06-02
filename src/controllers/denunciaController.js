const db = require("../models");

const crearDenuncia = async (req, res) => {

  try {

    const { publicacion_id, motivo, descripcion } = req.body;

    const userId = req.session.user.id;

    await db.Denuncia.create({

      motivo,
      descripcion,
      user_id: userId,
      publicacion_id

    });

    res.redirect("/publicaciones");

  } catch (error) {

    console.error(error);
    res.send("Error al denunciar");

  }

};

module.exports = {
  crearDenuncia
};