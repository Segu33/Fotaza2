const express = require("express");

const router = express.Router();

const followController =
require("../controllers/followController");

router.post(
    "/seguir/:id",
    followController.seguirUsuario
);

router.post(
    "/dejar-seguir/:id",
    followController.dejarDeSeguir
);

module.exports = router;