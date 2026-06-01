const express = require("express");

const router = express.Router();

const perfilController =
require("../controllers/perfilController");

router.get(
    "/:id",
    perfilController.verPerfil
);

module.exports = router;