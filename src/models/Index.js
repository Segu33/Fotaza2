require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ================= MODELOS =================

db.User = require("./User")(sequelize, Sequelize);
db.Publicacion = require("./Publicacion")(sequelize, Sequelize);
db.Imagen = require("./Imagen")(sequelize, Sequelize);
db.Comentario = require("./Comentario")(sequelize, Sequelize);
db.Valoracion = require("./Valoracion")(sequelize, Sequelize);
db.Follow = require("./Follow")(sequelize, Sequelize);
db.Notificacion = require("./Notificacion")(sequelize, Sequelize);
db.Etiqueta = require("./Etiqueta")(sequelize, Sequelize);
db.PublicacionEtiqueta = require("./PublicacionEtiqueta")(sequelize, Sequelize);
db.Coleccion = require("./Coleccion")(sequelize, Sequelize);
db.Favorito = require("./Favorito")(sequelize, Sequelize);
db.Interes = require("./Interes")(sequelize, Sequelize);
db.Denuncia = require("./Denuncia")(sequelize, Sequelize);

// ================= RELACIONES =================

// 👤 Usuario - Publicaciones

db.User.hasMany(db.Publicacion,{
    foreignKey:"user_id",
    as:"publicaciones",
    onDelete:"CASCADE"
});

db.Publicacion.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

// 🖼 Publicacion - Imagenes

db.Publicacion.hasMany(db.Imagen,{
    foreignKey:"publicacion_id",
    as:"imagenes",
    onDelete:"CASCADE"
});

db.Imagen.belongsTo(db.Publicacion,{
    foreignKey:"publicacion_id",
    as:"publicacion"
});

// 💬 Comentarios

db.User.hasMany(db.Comentario,{
    foreignKey:"user_id",
    as:"comentarios",
    onDelete:"CASCADE"
});

db.Comentario.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

db.Publicacion.hasMany(db.Comentario,{
    foreignKey:"publicacion_id",
    as:"comentarios",
    onDelete:"CASCADE"
});

db.Comentario.belongsTo(db.Publicacion,{
    foreignKey:"publicacion_id",
    as:"publicacion"
});

// ❤️ Valoraciones

db.User.hasMany(db.Valoracion,{
    foreignKey:"user_id",
    as:"valoraciones",
    onDelete:"CASCADE"
});

db.Valoracion.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

db.Imagen.hasMany(db.Valoracion,{
    foreignKey:"imagen_id",
    as:"valoraciones",
    onDelete:"CASCADE"
});

db.Valoracion.belongsTo(db.Imagen,{
    foreignKey:"imagen_id",
    as:"imagen"
});

// 👥 Followers

db.User.belongsToMany(db.User,{
    through:db.Follow,
    as:"seguidores",
    foreignKey:"seguido_id",
    otherKey:"seguidor_id"
});

db.User.belongsToMany(db.User,{
    through:db.Follow,
    as:"seguidos",
    foreignKey:"seguidor_id",
    otherKey:"seguido_id"
});

// 🏷 Etiquetas

db.Publicacion.belongsToMany(db.Etiqueta,{
    through:db.PublicacionEtiqueta,
    foreignKey:"publicacion_id",
    as:"etiquetas"
});

db.Etiqueta.belongsToMany(db.Publicacion,{
    through:db.PublicacionEtiqueta,
    foreignKey:"etiqueta_id",
    as:"publicaciones"
});

// 📁 Colecciones

db.User.hasMany(db.Coleccion,{
    foreignKey:"user_id",
    as:"colecciones",
    onDelete:"CASCADE"
});

db.Coleccion.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

db.Coleccion.belongsToMany(db.Publicacion,{
    through:db.Favorito,
    foreignKey:"coleccion_id",
    as:"publicaciones"
});

db.Publicacion.belongsToMany(db.Coleccion,{
    through:db.Favorito,
    foreignKey:"publicacion_id",
    as:"colecciones"
});

// 🎯 Intereses

db.User.hasMany(db.Interes,{
    foreignKey:"user_id",
    as:"intereses"
});

db.Interes.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

db.Imagen.hasMany(db.Interes,{
    foreignKey:"imagen_id",
    as:"intereses"
});

db.Interes.belongsTo(db.Imagen,{
    foreignKey:"imagen_id",
    as:"imagen"
});

// 🚨 Denuncias

db.User.hasMany(db.Denuncia,{
    foreignKey:"user_id",
    as:"denuncias"
});

db.Denuncia.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

db.Imagen.hasMany(db.Denuncia,{
    foreignKey:"imagen_id",
    as:"denuncias"
});

db.Denuncia.belongsTo(db.Imagen,{
    foreignKey:"imagen_id",
    as:"imagen"
});

db.Comentario.hasMany(db.Denuncia,{
    foreignKey:"comentario_id",
    as:"denuncias"
});

db.Denuncia.belongsTo(db.Comentario,{
    foreignKey:"comentario_id",
    as:"comentario"
});

// 🔔 Notificaciones

db.User.hasMany(db.Notificacion,{
    foreignKey:"user_id",
    as:"notificaciones"
});

db.Notificacion.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"receptor"
});

db.Notificacion.belongsTo(db.User,{
    foreignKey:"actor_id",
    as:"actor"
});

db.Publicacion.hasMany(db.Notificacion,{
    foreignKey:"publicacion_id",
    as:"notificaciones"
});

db.Notificacion.belongsTo(db.Publicacion,{
    foreignKey:"publicacion_id",
    as:"publicacion"
});

db.Imagen.hasMany(db.Notificacion,{
    foreignKey:"imagen_id",
    as:"notificaciones"
});

db.Notificacion.belongsTo(db.Imagen,{
    foreignKey:"imagen_id",
    as:"imagen"
});
 

//     Favoritos

db.Imagen.hasMany(db.Favorito,{
    foreignKey:"imagen_id",
    as:"favoritos"
});

db.Favorito.belongsTo(db.Imagen,{
    foreignKey:"imagen_id",
    as:"imagen"
});

db.User.hasMany(db.Favorito,{
    foreignKey:"user_id",
    as:"favoritosGuardados"
});

db.Favorito.belongsTo(db.User,{
    foreignKey:"user_id",
    as:"usuario"
});

// ================= CONEXIÓN =================

sequelize.authenticate()
.then(()=>{
    console.log("✅ DB conectada");
})
.catch(err=>{
    console.error("❌ Error DB:",err);
});

sequelize.sync()
.then(()=>{
    console.log("✅ Tablas sincronizadas");
})
.catch(err=>{
    console.error("❌ Error sync:",err);
});

module.exports = db;