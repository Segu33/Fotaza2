const db = require("../models");

const toggleFavorito = async (req, res) => {
  
  try {

    const userId = req.session.user.id;
    const imagenId = req.body.imagen_id;

    const existe = await db.Favorito.findOne({
      where: {
        user_id: userId,
        imagen_id: imagenId
      }
    });

    if (existe) {

      await existe.destroy();

    } else {

      await db.Favorito.create({
        user_id: userId,
        imagen_id: imagenId
      });

    }

    res.redirect(req.get("Referer") || "/publicaciones");

  } catch (error) {

    console.error(error);
    res.send("Error favorito");

  }

};

module.exports = {
  toggleFavorito
};