const bcrypt = require("bcrypt");
const { User } = require("../models");

// ================= VISTAS =================

exports.showLogin = (req, res) => {
  res.render("auth/login");
};

exports.showRegister = (req, res) => {
  res.render("auth/register");
};

// ================= REGISTRO =================

exports.register = async (req, res) => {

  const { username, email, password } = req.body;

  try {

    // Verificar email
    const usuarioExistente = await User.findOne({
      where: { email }
    });

    if (usuarioExistente) {

      return res.render("auth/register", {
        error: "Ya existe una cuenta con ese correo electrónico"
      });

    }

    // Verificar username
    const usernameExistente = await User.findOne({
      where: { username }
    });

    if (usernameExistente) {

      return res.render("auth/register", {
        error: "Ese nombre de usuario ya está en uso"
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await User.create({

      username,
      email,
      password: hashedPassword

    });

    res.redirect("/login");

  }
  catch (error) {

    console.error(error);

    res.render("auth/register", {
      error: "Error al registrar usuario"
    });

  }

};

// ================= LOGIN =================
exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {

      return res.render("auth/login", {
        error: "Usuario o contraseña incorrectos"
      });

    }

    // Verificar si el usuario está activo
    if (!user.activo) {

      return res.render("auth/login", {
        error: "Tu cuenta ha sido desactivada. Contactá a un administrador."
      });

    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {

      return res.render("auth/login", {
        error: "Usuario o contraseña incorrectos"
      });

    }

    req.session.user = {

      id: user.id,
      username: user.username,
      rol: user.rol

    };

    res.redirect("/");

  }
  catch (error) {

    console.error(error);

    res.render("auth/login", {
      error: "Error al iniciar sesión"
    });

  }

};
// ================= LOGOUT =================

exports.logout = (req, res) => {

  req.session.destroy(() => {

    res.redirect("/login");

  });

};