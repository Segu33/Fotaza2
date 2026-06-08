const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const favoritoController =
require("../controllers/favoritoController");

router.post(
  "/toggle",authMiddleware,favoritoController.toggleFavorito
);

module.exports = router;