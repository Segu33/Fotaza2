const express = require("express");
const router = express.Router();

const comentarioController = require("../controllers/comentarioController");

router.post("/crear", comentarioController.crearComentario);

module.exports = router;