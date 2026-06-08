const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const followController =
require("../controllers/followController");

router.post(
    "/seguir/:id",authMiddleware,
    followController.seguirUsuario
);

router.post(
    "/dejar-seguir/:id",authMiddleware,
    followController.dejarDeSeguir
);

module.exports = router;