const db = require("../models");

async function crearNotificacion({

 receptorId,
 actorId,
 tipo,
 publicacionId=null,
 imagenId=null

}){

 console.log("HELPER EJECUTADO");

 console.log({
  receptorId,
  actorId,
  tipo,
  publicacionId,
  imagenId
 });

 if(receptorId===actorId){

   console.log("MISMO USUARIO");

   return;
 }

 const nueva=

 await db.Notificacion.create({

   user_id:receptorId,

   actor_id:actorId,

   tipo,

   publicacion_id:publicacionId,

   imagen_id:imagenId

 });

 console.log("NOTIFICACION CREADA");

 console.log(nueva.id);

}

module.exports={
 crearNotificacion
};