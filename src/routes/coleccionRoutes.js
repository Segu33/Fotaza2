const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const coleccionController = require("../controllers/coleccionController");

router.get(
    "/",
    authMiddleware,
    coleccionController.listarColecciones
);

router.get(
    "/agregar/:publicacionId",
    authMiddleware,
    coleccionController.agregarPublicacionFormulario
);

// 👇 ESTA RUTA NUEVA
router.post(
    "/agregar",
    authMiddleware,
    coleccionController.guardarPublicacion
);

router.post(
    "/crear",
    authMiddleware,
    coleccionController.crearColeccion
);

router.post(
    "/eliminar/:id",
    authMiddleware,
    coleccionController.eliminarColeccion
);

router.get(
    "/:id",
    authMiddleware,
    coleccionController.verColeccion
);
router.post(
    "/quitar",
    coleccionController.quitarPublicacion
);
module.exports = router;