const express = require("express");
const router = express.Router();

const conversacionController = require("../controllers/conversacionController");
const mensajeController = require("../controllers/mensajeController");

// Bandeja de conversaciones
router.get("/", conversacionController.index);

// Crear o abrir conversación con un usuario
router.get("/nuevo/:id", conversacionController.abrir);

// Ver una conversación
router.get("/:id", mensajeController.ver);

// Enviar mensaje
router.post("/:id", mensajeController.enviar);

module.exports = router;