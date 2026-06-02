const express = require("express");

const router = express.Router();

const denunciaController =
require("../controllers/denunciaController");

router.post(
  "/crear",
  denunciaController.crearDenuncia
);

module.exports = router;