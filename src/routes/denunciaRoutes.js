const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const denunciaController = require("../controllers/denunciaController");

// Mostrar formulario de denuncia
router.get(
  "/crear/:imagen_id",
  authMiddleware,
  denunciaController.formularioDenuncia
);

// Guardar denuncia
router.post(
  "/crear",
  authMiddleware,
  denunciaController.crearDenuncia
);

module.exports = router;