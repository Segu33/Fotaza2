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
db.User.hasMany(db.Publicacion, {
  foreignKey: "user_id",
  as: "publicaciones",
  onDelete: "CASCADE",
});

db.Publicacion.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "usuario",
  onDelete: "CASCADE",
});

// 🖼️ Publicación - Imágenes
db.Publicacion.hasMany(db.Imagen, {
  foreignKey: "publicacion_id",
  as: "imagenes",
  onDelete: "CASCADE",
});

db.Imagen.belongsTo(db.Publicacion, {
  foreignKey: "publicacion_id",
  as: "publicacion",
  onDelete: "CASCADE",
});

// 💬 Comentarios
db.User.hasMany(db.Comentario, {
  foreignKey: "user_id",
  as: "comentarios",
  onDelete: "CASCADE",
});

db.Comentario.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "usuario",
  onDelete: "CASCADE",
});

db.Publicacion.hasMany(db.Comentario, {
  foreignKey: "publicacion_id",
  as: "comentarios",
  onDelete: "CASCADE",
});

db.Comentario.belongsTo(db.Publicacion, {
  foreignKey: "publicacion_id",
  as: "publicacion",
  onDelete: "CASCADE",
});

// ❤️ Valoraciones
db.User.hasMany(db.Valoracion, {
  foreignKey: "user_id",
  as: "valoraciones",
  onDelete: "CASCADE",
});

db.Imagen.hasMany(db.Valoracion, {
  foreignKey: "imagen_id",
  as: "valoraciones",
  onDelete: "CASCADE",
});

// 👥 Followers (auto-relación)
db.User.belongsToMany(db.User, {
  as: "seguidores",
  through: db.Follow,
  foreignKey: "seguido_id",
  onDelete: "CASCADE",
});

db.User.belongsToMany(db.User, {
  as: "seguidos",
  through: db.Follow,
  foreignKey: "seguidor_id",
  onDelete: "CASCADE",
});

// 🏷️ Etiquetas
db.Publicacion.belongsToMany(db.Etiqueta, {
  through: db.PublicacionEtiqueta,
  foreignKey: "publicacion_id",
  as: "etiquetas",
});

db.Etiqueta.belongsToMany(db.Publicacion, {
  through: db.PublicacionEtiqueta,
  foreignKey: "etiqueta_id",
  as: "publicaciones",
});

// 📁 Colecciones
db.User.hasMany(db.Coleccion, {
  foreignKey: "user_id",
  as: "colecciones",
  onDelete: "CASCADE",
});

db.Coleccion.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "usuario",
  onDelete: "CASCADE",
});

db.Coleccion.belongsToMany(db.Publicacion, {
  through: db.Favorito,
  foreignKey: "coleccion_id",
  as: "publicaciones",
});

db.Publicacion.belongsToMany(db.Coleccion, {
  through: db.Favorito,
  foreignKey: "publicacion_id",
  as: "colecciones",
});

// 🔔 Notificaciones
db.User.hasMany(db.Notificacion, {
  foreignKey: "user_id",
  as: "notificaciones",
  onDelete: "CASCADE",
});

// 🎯 Intereses
db.User.hasMany(db.Interes, {
  foreignKey: "user_id",
  as: "intereses",
  onDelete: "CASCADE",
});

db.Imagen.hasMany(db.Interes, {
  foreignKey: "imagen_id",
  as: "intereses",
  onDelete: "CASCADE",
});

// 🚨 Denuncias
db.User.hasMany(db.Denuncia, {
  foreignKey: "user_id",
  as: "denuncias",
  onDelete: "CASCADE",
});

// ================= CONEXIÓN =================

sequelize.authenticate()
  .then(() => console.log("✅ DB conectada"))
  .catch(err => console.error("❌ Error DB:", err));

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tablas sincronizadas"))
  .catch(err => console.error("❌ Error sync:", err));

module.exports = db;