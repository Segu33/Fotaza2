const db = require("../models");

const verPerfil = async (req, res) => {

    try {

        const usuario = await db.User.findByPk(
            req.params.id
        );

        if (!usuario) {

            return res.send(
                "Usuario no encontrado"
            );

        }

        const publicaciones =
        await db.Publicacion.findAll({

            where: {
                user_id: usuario.id
            }

        });

        const seguidores =
        await db.Follow.count({

            where: {
                seguido_id: usuario.id
            }

        });

        const seguidos =
        await db.Follow.count({

            where: {
                seguidor_id: usuario.id
            }

        });

        let siguiendo = false;

        if (req.session.user) {

            const follow =
            await db.Follow.findOne({

                where: {
                    seguidor_id: req.session.user.id,
                    seguido_id: usuario.id
                }

            });

            siguiendo = !!follow;
        }

        res.render(
            "perfil/perfil",
            {
                usuario,
                publicaciones,
                seguidores,
                seguidos,
                siguiendo,
                session: req.session
            }
        );

    }
    catch (error) {

        console.error(error);

        res.send(
            "Error cargando perfil"
        );

    }

};

module.exports = {
    verPerfil
};