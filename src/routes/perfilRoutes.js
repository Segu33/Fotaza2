const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const perfilController =
require("../controllers/perfilController");

router.get(
    "/:id",authMiddleware,
    perfilController.verPerfil
);

module.exports = router;