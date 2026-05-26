const db = require("../models");

const {
  crearNotificacion
} = require("../helpers/notificacionHelper");

const crearComentario = async (req,res)=>{

  try{

    const {
      texto,
      publicacion_id
    } = req.body;

    const userId=
    req.session.user.id;

    await db.Comentario.create({

      texto,

      user_id:userId,

      publicacion_id

    });

    // buscar dueño publicación

    const publicacion =
    await db.Publicacion.findByPk(
      publicacion_id
    );
     console.log("PUBLICACION");

    console.log(publicacion);
    if(publicacion){

      await crearNotificacion({

        receptorId:
        publicacion.user_id,

        actorId:
        userId,

        tipo:"comentario",

        publicacionId:
        publicacion.id

      });

    }

    res.redirect(
      "/publicaciones"
    );

  }
  catch(error){

    console.error(error);

    res.send(
      "Error al comentar"
    );

  }

};

module.exports={

  crearComentario

};