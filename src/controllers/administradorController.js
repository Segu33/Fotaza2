const db = require("../models");

// ========================================
// DASHBOARD
// ========================================

const dashboard = (req, res) => {

    res.render("administrador/index");

};

// ========================================
// CENTRO DE MODERACIÓN
// ========================================

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

            // Contar denuncias de todas las imágenes
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
                color: "secondary"
            };

            if (totalDenuncias >= 5) {

                prioridad = {
                    texto: "Alta",
                    color: "danger"
                };

            } else if (totalDenuncias >= 3) {

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

    } catch (error) {

        console.error(error);

        res.send("Error cargando publicaciones.");

    }

};

// ========================================
// VER EXPEDIENTE DEL CASO
// ========================================

const verCaso = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(

            req.params.id,

            {

                include: [
                    {
                        model: db.User,
                        as: "usuario"
                    },
                    {
                        model: db.Imagen,
                        as: "imagenes"
                    }
                ]

            }

        );

        if (!publicacion) {

            return res.redirect("/administrador/publicaciones");

        }

        let totalDenuncias = 0;

        for (const imagen of publicacion.imagenes) {

            const cantidad = await db.Denuncia.count({

                where: {
                    imagen_id: imagen.id
                }

            });

            totalDenuncias += cantidad;

        }

        let prioridad = "Normal";

        if (totalDenuncias >= 5) {

            prioridad = "Alta";

        } else if (totalDenuncias >= 3) {

            prioridad = "Media";

        }

        res.render("administrador/caso", {

            publicacion,
            totalDenuncias,
            prioridad

        });

    } catch (error) {

        console.error(error);

        res.redirect("/administrador/publicaciones");

    }

};

// ========================================
// APROBAR PUBLICACIÓN
// ========================================

const aprobarPublicacion = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(req.params.id, {

            include: [
                {
                    model: db.Imagen,
                    as: "imagenes"
                }
            ]

        });

        if (!publicacion) {

            return res.redirect("/administrador/publicaciones");

        }

        // Eliminar todas las denuncias de las imágenes
        for (const imagen of publicacion.imagenes) {

            await db.Denuncia.destroy({

                where: {
                    imagen_id: imagen.id
                }

            });

        }

        // Desbloquear publicación
        await publicacion.update({

            bloqueada: false

        });

        res.redirect("/administrador/publicaciones");

    } catch (error) {

        console.error(error);

        res.redirect("/administrador/publicaciones");

    }

};

// ========================================
// DAR DE BAJA PUBLICACIÓN
// ========================================

const darDeBajaPublicacion = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(req.params.id, {

            include: [
                {
                    model: db.User,
                    as: "usuario"
                }
            ]

        });

        if (!publicacion) {

            return res.redirect("/administrador/publicaciones");

        }

        // Mantener bloqueada
        await publicacion.update({

            bloqueada: true,
            comentarios_habilitados: false

        });

        // Incrementar contador del usuario
        await publicacion.usuario.increment("publicaciones_bajadas");

        res.redirect("/administrador/publicaciones");

    } catch (error) {

        console.error(error);

        res.redirect("/administrador/publicaciones");

    }

};

// ========================================
// EXPORTS
// ========================================

module.exports = {

    dashboard,

    publicaciones,

    verCaso,

    aprobarPublicacion,

    darDeBajaPublicacion

};