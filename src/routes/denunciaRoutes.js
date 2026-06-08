const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const denunciaController =
require("../controllers/denunciaController");

router.post(
  "/crear",authMiddleware,denunciaController.crearDenuncia
);

module.exports = router;