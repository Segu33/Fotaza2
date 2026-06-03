const db = require("../models");

const listar = async(req,res)=>{

 try{

  if(!req.session.user){

   return res.redirect(
    "/login"
   );

  }

  const userId =req.session.user.id;

  const notificaciones =

  await db.Notificacion.findAll({

   where:{
    user_id:userId
   },

   include:[
   {
    model:db.User,
    as:"actor"
   }
   ],

   order:[
    ["createdAt","DESC"]
   ]

  });

  res.render(

   "notificaciones/index",

   {
    notificaciones
   }

  );

 }
 catch(error){

  console.error(error);

  res.send(
   "Error cargando notificaciones"
  );

 }

};

module.exports={
 listar
};