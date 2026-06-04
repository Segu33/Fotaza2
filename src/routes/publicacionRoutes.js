const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const publicacionController = require("../controllers/publicacionController");


// 👉 FEED (ESTA FALTA)
router.get("/", publicacionController.listarPublicaciones);

// 👉 VER PUBLICACIÓN
router.get("/:id", publicacionController.verPublicacion);

// 👉 MOSTRAR FORM
router.get("/crear", (req, res) => {
  res.render("publicaciones/crear");
});

// 👉 CREAR PUBLICACIÓN
router.post("/crear", upload.single("imagen"), publicacionController.crearPublicacion);

module.exports = router;