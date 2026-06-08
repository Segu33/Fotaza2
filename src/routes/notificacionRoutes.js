const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const controller =
require("../controllers/notificacionController");

router.get(
    "/",authMiddleware,controller.listar
);

module.exports = router;