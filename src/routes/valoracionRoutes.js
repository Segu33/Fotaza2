const express = require("express");
const router = express.Router();

const valoracionController = require("../controllers/valoracionController");

router.post("/like", valoracionController.toggleLike);

module.exports = router;