const bcrypt = require("bcrypt");
const { User } = require("../models");

// Vistas
exports.showLogin = (req, res) => {
  res.render("auth/login");
};

exports.showRegister = (req, res) => {
  res.render("auth/register");
};

// Registro
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.redirect("/login");
  } catch (error) {
    res.send("Error al registrar");
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.send("Usuario no encontrado");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.send("Contraseña incorrecta");

    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect("/");
  } catch (error) {
    res.send("Error en login");
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};