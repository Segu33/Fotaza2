const db = require("../models");

// =======================
// Ver perfil
// =======================

const verPerfil = async (req, res) => {

    try {

        const usuario = await db.User.findByPk(req.params.id);

        if (!usuario) {
            return res.send("Usuario no encontrado");
        }

        const publicaciones = await db.Publicacion.findAll({

            where: {
                user_id: usuario.id,
                bloqueada: false
            },

            include: [
                {
                    model: db.Imagen,
                    as: "imagenes"
                }
            ]

        });

        const seguidores = await db.Follow.count({

            where: {
                seguido_id: usuario.id
            }

        });

        const seguidos = await db.Follow.count({

            where: {
                seguidor_id: usuario.id
            }

        });

        let siguiendo = false;

        if (req.session.user) {

            const follow = await db.Follow.findOne({

                where: {
                    seguidor_id: req.session.user.id,
                    seguido_id: usuario.id
                }

            });

            siguiendo = !!follow;
        }

        res.render("perfil/perfil", {
            usuario,
            publicaciones,
            seguidores,
            seguidos,
            siguiendo,
            session: req.session
        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando perfil");

    }

};

// =======================
// Mostrar formulario
// =======================

const editarPerfil = async (req, res) => {

    try {

        const usuario = await db.User.findByPk(req.session.user.id);

        if (!usuario) {
            return res.redirect("/");
        }

        res.render("perfil/editar", {
            usuario,
            session: req.session
        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando formulario");

    }

};

// =======================
// Guardar cambios
// =======================

const actualizarPerfil = async (req, res) => {

    try {

        const usuario = await db.User.findByPk(req.session.user.id);

        if (!usuario) {
            return res.redirect("/");
        }

        usuario.username = req.body.username;
        usuario.email = req.body.email;
        usuario.biografia = req.body.biografia;

        if (req.file) {
            usuario.foto_perfil = "/uploads/" + req.file.filename;
        }

        await usuario.save();

        req.session.user.username = usuario.username;
        req.session.user.email = usuario.email;
        req.session.user.foto_perfil = usuario.foto_perfil;

        res.redirect("/perfil/" + usuario.id);

    } catch (error) {

        console.error(error);
        res.send("Error actualizando perfil");

    }

};

module.exports = {
    verPerfil,
    editarPerfil,
    actualizarPerfil
};