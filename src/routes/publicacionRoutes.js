const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const authMiddleware = require("../middlewares/authMiddleware");
const publicacionController = require("../controllers/publicacionController");

// 👉 FEED
router.get("/", publicacionController.listarPublicaciones);

// 👉 MOSTRAR FORM
router.get("/crear", authMiddleware, (req, res) => {
  res.render("publicaciones/crear");
});

// 👉 CREAR PUBLICACIÓN
router.post(
  "/crear",
  authMiddleware,
  upload.single("imagen"),
  publicacionController.crearPublicacion
);

// 👉 ABRIR / CERRAR COMENTARIOS
router.post(
  "/:id/comentarios",
  authMiddleware,
  publicacionController.toggleComentarios
);
// 👉 MOSTRAR EDITAR PUBLICACIÓN
router.get(
  "/editar/:id",
  authMiddleware,
  publicacionController.mostrarEditarPublicacion
);

// 👉 GUARDAR CAMBIOS
router.post(
  "/editar/:id",
  authMiddleware,
  upload.single("imagen"),
  publicacionController.editarPublicacion
);
// 👉 VER PUBLICACIÓN
router.get("/:id", publicacionController.verPublicacion);

module.exports = router;