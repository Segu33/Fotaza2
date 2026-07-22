const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const perfilController = require("../controllers/perfilController");
const upload = require("../config/multer");

// Editar perfil
router.get(
    "/editar",
    authMiddleware,
    perfilController.editarPerfil
);

router.post(
    "/editar",
    authMiddleware,
    upload.single("foto"),
    perfilController.actualizarPerfil
);

// Ver perfil
router.get(
    "/:id",
    authMiddleware,
    perfilController.verPerfil
);

module.exports = router;