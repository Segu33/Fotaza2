const db = require("../models");

async function crearNotificacion({

    receptorId,
    actorId,
    tipo,
    publicacionId = null,
    imagenId = null,
    conversacionId = null

}) {

    console.log("TIPO RECIBIDO:", tipo);

    if (receptorId === actorId) {
        return;
    }

    const nueva = await db.Notificacion.create({

        user_id: receptorId,

        actor_id: actorId,

        tipo,

        publicacion_id: publicacionId,

        imagen_id: imagenId,

        conversacion_id: conversacionId

    });

    console.log("NOTIFICACIÓN CREADA:");
    console.log(nueva.toJSON());

}

module.exports = {
    crearNotificacion
};