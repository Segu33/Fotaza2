const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const controller =
require("../controllers/notificacionController");

router.get(
    "/",authMiddleware,controller.listar
);

router.get(
  "/abrir/:id",
  controller.abrirNotificacion
);
module.exports = router;