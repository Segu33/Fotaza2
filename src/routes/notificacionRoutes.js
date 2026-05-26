const express = require("express");

const router = express.Router();

const controller =
require("../controllers/notificacionController");

router.get(
    "/",
    controller.listar
);

module.exports = router;