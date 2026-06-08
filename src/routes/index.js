const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

// Si ya inició sesión → feed
// Si no inició sesión → login
router.get("/", (req, res) => {

  if (req.session.user) {
    return res.redirect("/publicaciones");
  }

  return res.redirect("/login");

});

router.use("/", authRoutes);

module.exports = router;