const db = require("../models");
const bcrypt = require("bcrypt");
// =======================
// Ver perfil
// =======================

const verPerfil = async (req, res) => {
  try {
    const usuario = await db.User.findByPk(req.params.id);

    if (!usuario) {
      return res.send("Usuario no encontrado");
    }

    const publicaciones = await db.Publicacion.findAll({
      where: {
        user_id: usuario.id,
        bloqueada: false,
      },

      include: [
        {
          model: db.Imagen,
          as: "imagenes",
        },
      ],
    });

    const seguidores = await db.Follow.count({
      where: {
        seguido_id: usuario.id,
      },
    });

    const seguidos = await db.Follow.count({
      where: {
        seguidor_id: usuario.id,
      },
    });

    let siguiendo = false;

    if (req.session.user) {
      const follow = await db.Follow.findOne({
        where: {
          seguidor_id: req.session.user.id,
          seguido_id: usuario.id,
        },
      });

      siguiendo = !!follow;
    }
    // =======================
    // PUBLICACIONES DE USUARIOS QUE SIGO
    // =======================

    let publicacionesSeguidos = [];

    if (req.session.user) {
      const follows = await db.Follow.findAll({
        where: {
          seguidor_id: req.session.user.id,
        },

        attributes: ["seguido_id"],
      });

      const idsSeguidos = follows.map((f) => f.seguido_id);

      for (const idUsuario of idsSeguidos) {
        const publicacion = await db.Publicacion.findOne({
          where: {
            user_id: idUsuario,
            bloqueada: false,
          },

          include: [
            {
              model: db.Imagen,
              as: "imagenes",
            },
            {
              model: db.User,
              as: "usuario",
            },
          ],

          order: [["id", "DESC"]],
        });

        if (publicacion) {
          publicacionesSeguidos.push(publicacion);
        }

        if (publicacionesSeguidos.length === 4) break;
      }
    }

    // ===========================
    // Mensaje de éxito temporal
    // ===========================

    const success = req.session.success;

    delete req.session.success;

    res.render("perfil/perfil", {
      usuario,
      publicaciones,
      seguidores,
      seguidos,
      siguiendo,
      publicacionesSeguidos,
      session: req.session,
      success,
    });
  } catch (error) {
    console.error(error);
    res.send("Error cargando perfil");
  }
};

// =======================
// Mostrar formulario
// =======================

const editarPerfil = async (req, res) => {
  try {
    const usuario = await db.User.findByPk(req.session.user.id);

    if (!usuario) {
      return res.redirect("/");
    }

    res.render("perfil/editar", {
      usuario,
      session: req.session,
    });
  } catch (error) {
    console.error(error);
    res.send("Error cargando formulario");
  }
};

// =======================
// Guardar cambios
// =======================

const actualizarPerfil = async (req, res) => {
  try {
    const usuario = await db.User.findByPk(req.session.user.id);

    if (!usuario) {
      return res.redirect("/");
    }

    usuario.username = req.body.username;
    usuario.email = req.body.email;
    usuario.biografia = req.body.biografia;

    if (req.file) {
      usuario.foto_perfil = "/uploads/" + req.file.filename;
    }

    await usuario.save();

    req.session.user.username = usuario.username;
    req.session.user.email = usuario.email;
    req.session.user.foto_perfil = usuario.foto_perfil;

    res.redirect("/perfil/" + usuario.id);
  } catch (error) {
    console.error(error);
    res.send("Error actualizando perfil");
  }
};
// =======================================
// MOSTRAR CAMBIO DE CONTRASEÑA
// =======================================

const mostrarCambiarPassword = (req, res) => {
  res.render("perfil/cambiarPassword", {
    session: req.session,
    error: null,
    success: null,
  });
};

// =======================================
// CAMBIAR CONTRASEÑA
// =======================================

const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, passwordNueva, confirmarPassword } = req.body;

    const usuario = await db.User.findByPk(req.session.user.id);

    if (!usuario) {
      return res.redirect("/login");
    }

    const coincide = await bcrypt.compare(passwordActual, usuario.password);

    if (!coincide) {
      return res.render("perfil/cambiarPassword", {
        session: req.session,
        error: "La contraseña actual es incorrecta.",
        success: null,
      });
    }

    if (passwordNueva !== confirmarPassword) {
      return res.render("perfil/cambiarPassword", {
        session: req.session,
        error: "Las nuevas contraseñas no coinciden.",
        success: null,
      });
    }

    if (passwordNueva.length < 6) {
      return res.render("perfil/cambiarPassword", {
        session: req.session,
        error: "La contraseña debe tener al menos 6 caracteres.",
        success: null,
      });
    }

    const passwordHash = await bcrypt.hash(passwordNueva, 10);

    await usuario.update({
      password: passwordHash,
    });
    req.session.success = "✅ Contraseña actualizada correctamente.";
    return res.redirect(`/perfil/${usuario.id}`);
  } catch (error) {
    console.error(error);

    return res.render("perfil/cambiarPassword", {
      session: req.session,
      error: "Ocurrió un error al cambiar la contraseña.",
      success: null,
    });
  }
};

module.exports = {
  verPerfil,
  editarPerfil,
  actualizarPerfil,
  mostrarCambiarPassword,
  cambiarPassword,
};
