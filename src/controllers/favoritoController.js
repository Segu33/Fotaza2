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

const misFavoritos = async (req, res) => {

    try {

        const favoritos = await db.Favorito.findAll({

            where: {
                user_id: req.session.user.id
            },

            include: [
                {
                    model: db.Imagen,
                    as: "imagen",
                    required: true,
                    include: [
                        {
                            model: db.Publicacion,
                            as: "publicacion"
                        }
                    ]
                }
            ]

        });

        console.log(JSON.stringify(favoritos, null, 2));

        res.render("favoritos/index", {
            favoritos,
            session: req.session
        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando favoritos");

    }

};

module.exports = {
    toggleFavorito,
    misFavoritos
};