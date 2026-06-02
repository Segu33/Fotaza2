const express = require("express");
const router = express.Router();

const favoritoController =
require("../controllers/favoritoController");

router.post(
  "/toggle",
  favoritoController.toggleFavorito
);

module.exports = router;