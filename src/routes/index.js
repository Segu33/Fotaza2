const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/", authRoutes);

router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;