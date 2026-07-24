const db = require("../models");
const { crearNotificacion } = require("../helpers/notificacionHelper");

exports.ver = async (req, res) => {

    const conversacion = await db.Conversacion.findByPk(req.params.id, {

        include: [

            {
                model: db.User,
                as: "usuario1"
            },

            {
                model: db.User,
                as: "usuario2"
            },

            {
                model: db.Mensaje,
                as: "mensajes",

                include: [
                    {
                        model: db.User,
                        as: "remitente"
                    }
                ]

            }

        ]

    });

    if (!conversacion) {
        return res.redirect("/mensajes");
    }

    //==========================
    // SEGURIDAD
    //==========================

    const usuarioActual = req.session.user.id;

    if (
        conversacion.usuario1_id !== usuarioActual &&
        conversacion.usuario2_id !== usuarioActual
    ) {
        return res.redirect("/mensajes");
    }

    //==========================
    // MARCAR MENSAJES LEÍDOS
    //==========================

    await db.Mensaje.update(

        { leido: true },

        {

            where: {

                conversacion_id: conversacion.id,

                remitente_id: {
                    [db.Sequelize.Op.ne]: usuarioActual
                },

                leido: false

            }

        }

    );

    // Ordenar mensajes por fecha

    conversacion.mensajes.sort((a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    );

    res.render("mensajes/chat", {

        conversacion,
        usuarioId: usuarioActual

    });

};

exports.enviar = async (req, res) => {

    if (!req.body.texto.trim()) {
        return res.redirect(`/mensajes/${req.params.id}`);
    }

    const conversacion = await db.Conversacion.findByPk(req.params.id);

    if (!conversacion) {
        return res.redirect("/mensajes");
    }

    const usuarioActual = req.session.user.id;

    //==========================
    // SEGURIDAD
    //==========================

    if (
        conversacion.usuario1_id !== usuarioActual &&
        conversacion.usuario2_id !== usuarioActual
    ) {
        return res.redirect("/mensajes");
    }

    //==========================
    // CREAR MENSAJE
    //==========================

    await db.Mensaje.create({

        conversacion_id: conversacion.id,

        remitente_id: usuarioActual,

        texto: req.body.texto.trim()

    });

    //==========================
    // CREAR NOTIFICACIÓN
    //==========================

    const receptorId =
        conversacion.usuario1_id === usuarioActual
            ? conversacion.usuario2_id
            : conversacion.usuario1_id;

    await crearNotificacion({

        receptorId,

        actorId: usuarioActual,

        tipo: "mensaje",

        conversacionId: conversacion.id

    });

    // Actualiza updatedAt

    conversacion.changed("updatedAt", true);
    await conversacion.save();

    res.redirect(`/mensajes/${conversacion.id}`);

};