const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesión
app.use(session({
  secret: "secreto123",
  resave: false,
  saveUninitialized: false
}));

// PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
const routes = require("./routes");
app.use("/", routes);

// 👉 COMENTARIOS
const comentarioRoutes = require("./routes/comentarioRoutes");
app.use("/comentarios", comentarioRoutes);

// 👉 PUBLICACIONES 
const publicacionRoutes = require("./routes/publicacionRoutes");
app.use("/publicaciones", publicacionRoutes);

// 👉 VALORACIONES  
const valoracionRoutes = require("./routes/valoracionRoutes");
app.use("/valoraciones", valoracionRoutes);

// 👉 NOTIFICACIONES
const notificacionRoutes = require("./routes/notificacionRoutes");
app.use("/notificaciones", notificacionRoutes);

module.exports = app;