const db = require("../models");

const listarColecciones = async (req, res) => {

    try {

        const colecciones = await db.Coleccion.findAll({

            where: {
                user_id: req.session.user.id
            },

            order: [
                ["nombre", "ASC"]
            ]

        });

        res.render("colecciones/index", {
            colecciones,
            session: req.session
        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando colecciones");

    }

};

const crearColeccion = async (req, res) => {

    try {

        const { nombre } = req.body;

        if (!nombre || nombre.trim() === "") {
            return res.redirect("/colecciones");
        }

        await db.Coleccion.create({

            nombre: nombre.trim(),
            user_id: req.session.user.id

        });

        res.redirect("/colecciones");

    } catch (error) {

        console.error(error);
        res.send("Error creando colección");

    }

};

const eliminarColeccion = async (req, res) => {

    try {

        const coleccion = await db.Coleccion.findByPk(req.params.id);

        if (!coleccion) {
            return res.redirect("/colecciones");
        }

        if (coleccion.user_id !== req.session.user.id) {
            return res.status(403).send("No autorizado");
        }

        await coleccion.destroy();

        res.redirect("/colecciones");

    } catch (error) {

        console.error(error);
        res.send("Error eliminando colección");

    }

};
const verColeccion = async (req, res) => {

    try {

        const coleccion = await db.Coleccion.findByPk(req.params.id, {

            include: [

                {
                    model: db.Publicacion,
                    as: "publicaciones",
                    include: [

                        {
                            model: db.User,
                            as: "usuario"
                        },

                        {
                            model: db.Imagen,
                            as: "imagenes"
                        }

                    ]
                }

            ]

        });

        if (!coleccion) {
            return res.redirect("/colecciones");
        }

        if (coleccion.user_id !== req.session.user.id) {
            return res.status(403).send("No autorizado");
        }

        res.render("colecciones/detalle", {

            coleccion,
            publicaciones: coleccion.publicaciones,
            session: req.session

        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando la colección");

    }

};
const agregarPublicacionFormulario = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(
            req.params.publicacionId
        );

        if (!publicacion) {
            return res.redirect("/");
        }

        const colecciones = await db.Coleccion.findAll({

            where: {
                user_id: req.session.user.id
            },

            order: [
                ["nombre", "ASC"]
            ]

        });

        res.render("colecciones/agregar", {

            publicacion,
            colecciones,
            session: req.session

        });

    } catch (error) {

        console.error(error);
        res.send("Error cargando las colecciones");

    }

};
const guardarPublicacion = async (req, res) => {

    try {

        const { coleccion_id, publicacion_id } = req.body;

        // Verificar que la colección exista y pertenezca al usuario
        const coleccion = await db.Coleccion.findOne({

            where: {
                id: coleccion_id,
                user_id: req.session.user.id
            }

        });

        if (!coleccion) {
            return res.status(403).send("Colección no válida");
        }

        // Evitar duplicados
        const existe = await db.ColeccionPublicacion.findOne({

            where: {
                coleccion_id,
                publicacion_id
            }

        });

        if (existe) {
            return res.redirect(`/colecciones/${coleccion_id}`);
        }

        // Guardar relación
        await db.ColeccionPublicacion.create({

            coleccion_id,
            publicacion_id

        });

        res.redirect(`/colecciones/${coleccion_id}`);

    } catch (error) {

        console.error(error);
        res.send("Error guardando publicación");

    }

};
const quitarPublicacion = async (req, res) => {

    try {

        const { coleccion_id, publicacion_id } = req.body;

        const coleccion = await db.Coleccion.findOne({

            where: {
                id: coleccion_id,
                user_id: req.session.user.id
            }

        });

        if (!coleccion) {
            return res.status(403).send("No autorizado");
        }

        await db.ColeccionPublicacion.destroy({

            where: {
                coleccion_id,
                publicacion_id
            }

        });

        res.redirect(`/colecciones/${coleccion_id}`);

    } catch (error) {

        console.error(error);
        res.send("Error quitando publicación de la colección");

    }

};

module.exports = {
    listarColecciones,
    crearColeccion,
    eliminarColeccion,
    verColeccion,
    agregarPublicacionFormulario,
    guardarPublicacion,
    quitarPublicacion
};