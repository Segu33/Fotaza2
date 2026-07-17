const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const adminMiddleware =
require("../middlewares/adminMiddleware");

const administradorController =
require("../controllers/administradorController");

// =======================================
// DASHBOARD
// =======================================

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    administradorController.dashboard

);

// =======================================
// CENTRO DE MODERACIÓN
// =======================================

router.get(

    "/publicaciones",

    authMiddleware,

    adminMiddleware,

    administradorController.publicaciones

);

// =======================================
// VER EXPEDIENTE DEL CASO
// =======================================

router.get(

    "/publicaciones/:id",

    authMiddleware,

    adminMiddleware,

    administradorController.verCaso

);

// =======================================
// APROBAR PUBLICACIÓN
// =======================================

router.post(

    "/publicaciones/:id/aprobar",

    authMiddleware,

    adminMiddleware,

    administradorController.aprobarPublicacion

);

// =======================================
// DAR DE BAJA PUBLICACIÓN
// =======================================

router.post(

    "/publicaciones/:id/dar-de-baja",

    authMiddleware,

    adminMiddleware,

    administradorController.darDeBajaPublicacion

);

module.exports = router;