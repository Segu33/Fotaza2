const db = require("../models");

const seguirUsuario = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        const seguidorId = req.session.user.id;
        const seguidoId = req.params.id;

        if (seguidorId == seguidoId) {
            return res.redirect(`/perfil/${seguidoId}`);
        }

        const existe = await db.Follow.findOne({

            where: {
                seguidor_id: seguidorId,
                seguido_id: seguidoId
            }

        });

        if (!existe) {

            await db.Follow.create({

                seguidor_id: seguidorId,
                seguido_id: seguidoId

            });

        }

        res.redirect(`/perfil/${seguidoId}`);

    } catch (error) {

        console.error(error);
        res.send("Error al seguir usuario");

    }

};

const dejarDeSeguir = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        const seguidorId = req.session.user.id;
        const seguidoId = req.params.id;

        await db.Follow.destroy({

            where: {
                seguidor_id: seguidorId,
                seguido_id: seguidoId
            }

        });

        res.redirect(`/perfil/${seguidoId}`);

    } catch (error) {

        console.error(error);
        res.send("Error al dejar de seguir");

    }

};

module.exports = {
    seguirUsuario,
    dejarDeSeguir
};