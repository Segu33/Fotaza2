const db = require("../models");
const { Op } = require("sequelize");

// Mostrar todas las conversaciones del usuario
exports.index = async (req, res) => {

    const usuarioId = req.session.user.id;

    const conversaciones = await db.Conversacion.findAll({

        where: {
            [Op.or]: [
                { usuario1_id: usuarioId },
                { usuario2_id: usuarioId }
            ]
        },

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
        limit: 1,
        order: [["createdAt", "DESC"]]
    }
]

    });

    res.render("mensajes/index", {
        conversaciones,
        usuarioId
    });

};


// Abrir una conversación con un usuario
exports.abrir = async (req, res) => {

    const usuarioActual = req.session.user.id;
    const otroUsuario = Number(req.params.id);

    let conversacion = await db.Conversacion.findOne({

        where: {

            [Op.or]: [

                {
                    usuario1_id: usuarioActual,
                    usuario2_id: otroUsuario
                },

                {
                    usuario1_id: otroUsuario,
                    usuario2_id: usuarioActual
                }

            ]

        }

    });

    if (!conversacion) {

        conversacion = await db.Conversacion.create({

            usuario1_id: usuarioActual,
            usuario2_id: otroUsuario

        });

    }

    res.redirect(`/mensajes/${conversacion.id}`);

};