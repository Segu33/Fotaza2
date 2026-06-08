const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const comentarioController = require("../controllers/comentarioController");

router.post("/crear",authMiddleware, comentarioController.crearComentario);

module.exports = router;