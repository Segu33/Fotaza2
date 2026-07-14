const db = require("../models");

// Dashboard
const dashboard = (req, res) => {

    res.render(
        "administrador/index"
    );

};

// Publicaciones denunciadas
// Publicaciones denunciadas
const publicaciones = async (req, res) => {

    try {

        const publicaciones = await db.Publicacion.findAll({

            where: {
                bloqueada: true
            },

            include: [

                {
                    model: db.User,
                    as: "usuario"
                },

                {
                    model: db.Imagen,
                    as: "imagenes"
                }

            ],

            order: [
                ["id", "DESC"]
            ]

        });

        const casos = [];

        for (const publicacion of publicaciones) {

            let totalDenuncias = 0;

            // Contar denuncias de todas las imágenes de la publicación
            for (const imagen of publicacion.imagenes) {

                const cantidad = await db.Denuncia.count({

                    where: {
                        imagen_id: imagen.id
                    }

                });

                totalDenuncias += cantidad;

            }

            // Calcular prioridad
            let prioridad = {
                texto: "Normal",
                color: "success"
            };

            if (totalDenuncias >= 6) {

                prioridad = {
                    texto: "Alta",
                    color: "danger"
                };

            } else if (totalDenuncias >= 4) {

                prioridad = {
                    texto: "Media",
                    color: "warning"
                };

            }

            casos.push({

                publicacion,
                totalDenuncias,
                prioridad

            });

        }

        res.render("administrador/publicaciones", {

            casos

        });

    }

    catch (error) {

        console.error(error);

        res.send("Error cargando publicaciones.");

    }

};

module.exports={

    dashboard,

    publicaciones

};