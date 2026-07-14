const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const adminMiddleware =
require("../middlewares/adminMiddleware");

const administradorController =
require("../controllers/administradorController");

// Dashboard

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    administradorController.dashboard

);

// Centro de moderación

router.get(

    "/publicaciones",

    authMiddleware,

    adminMiddleware,

    administradorController.publicaciones

);

module.exports = router;