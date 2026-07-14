module.exports = (req, res, next) => {

    if (!req.session.user) {

        return res.redirect("/login");

    }

    if (req.session.user.rol !== "administrador") {

        return res.status(403).send(
            "Acceso denegado"
        );

    }

    next();

};