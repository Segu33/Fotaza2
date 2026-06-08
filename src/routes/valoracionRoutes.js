const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const valoracionController = require("../controllers/valoracionController");

router.post("/like",authMiddleware, valoracionController.toggleLike);

module.exports = router;