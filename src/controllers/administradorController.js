const db = require("../models");

// ========================================
// DASHBOARD
// ========================================

const dashboard = (req, res) => {

    res.render("administrador/index");

};

// ========================================
// CENTRO DE MODERACIÓN
// ========================================

const publicaciones = async (req, res) => {

    try {

        const publicaciones = await db.Publicacion.findAll({

            where: {
                bloqueada: true,
                estado_moderacion: "pendiente"
            },

            include: [
                {
                    model: db.User,
                    as: "usuario"
                },
                {
                    model: db.Imagen,
                    as: "imagenes"
                },
                {
                    model: db.Etiqueta,
                    as: "etiquetas",
                    through: {
                        attributes: []
                    }
                }
            ],

            order: [
                ["id", "DESC"]
            ]

        });

        const casos = [];

        for (const publicacion of publicaciones) {

            let totalDenuncias = 0;

            const denuncias = [];

            for (const imagen of publicacion.imagenes) {

                const lista = await db.Denuncia.findAll({

                    where: {
                        imagen_id: imagen.id
                    }

                });

                totalDenuncias += lista.length;

                denuncias.push(...lista);

            }

            let prioridad = {
                texto: "Normal",
                color: "secondary"
            };

            if (totalDenuncias >= 5) {

                prioridad = {
                    texto: "Alta",
                    color: "danger"
                };

            } else if (totalDenuncias >= 3) {

                prioridad = {
                    texto: "Media",
                    color: "warning"
                };

            }

            casos.push({

                publicacion,

                totalDenuncias,

                denuncias,

                prioridad

            });

        }

        res.render("administrador/publicaciones", {

            casos

        });

    }
    catch (error) {

        console.error(error);

        res.send("Error cargando publicaciones.");

    }

};

// ========================================
// VER EXPEDIENTE DEL CASO
// ========================================

const verCaso = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: db.User,
                        as: "usuario"
                    },
                    {
                        model: db.Imagen,
                        as: "imagenes"
                    },
                    {
                        model: db.Etiqueta,
                        as: "etiquetas",
                        through: {
                            attributes: []
                        }
                    }
                ]
            }
        );

        if (!publicacion) {
            return res.redirect("/administrador/publicaciones");
        }

        //---------------------------------------------------
        // ESTADÍSTICAS DE LA PUBLICACIÓN
        //---------------------------------------------------

        let totalLikes = 0;
        let totalFavoritos = 0;
        let totalDenuncias = 0;

        const denuncias = [];

        for (const imagen of publicacion.imagenes) {

            const likes = await db.Valoracion.count({
                where: {
                    imagen_id: imagen.id
                }
            });

            totalLikes += likes;

            const favoritos = await db.Favorito.count({
                where: {
                    imagen_id: imagen.id
                }
            });

            totalFavoritos += favoritos;

            const listaDenuncias = await db.Denuncia.findAll({
                where: {
                    imagen_id: imagen.id
                },
                include: [
                    {
                        model: db.User,
                        as: "usuario"
                    }
                ]
            });
                 order:[
                 ["id","DESC"]
            ]

            totalDenuncias += listaDenuncias.length;

            denuncias.push(...listaDenuncias);

        }

        const totalComentarios = await db.Comentario.count({

            where: {
                publicacion_id: publicacion.id
            }

        });

        //---------------------------------------------------
        // INFORMACIÓN DEL USUARIO
        //---------------------------------------------------

        const usuario = publicacion.usuario;

        const publicacionesUsuario = await db.Publicacion.count({

            where: {
                user_id: usuario.id
            }

        });

        const comentariosUsuario = await db.Comentario.count({

            where: {
                user_id: usuario.id
            }

        });

        const favoritosUsuario = await db.Favorito.count({

            where: {
                user_id: usuario.id
            }

        });

        const seguidores = await db.Follow.count({

            where: {
                seguido_id: usuario.id
            }

        });

        const siguiendo = await db.Follow.count({

            where: {
                seguidor_id: usuario.id
            }

        });

        //---------------------------------------------------
        // PRIORIDAD
        //---------------------------------------------------

        let prioridad = {
            texto: "Normal",
            color: "secondary"
        };

        if (totalDenuncias >= 5) {

            prioridad = {
                texto: "Alta",
                color: "danger"
            };

        } else if (totalDenuncias >= 3) {

            prioridad = {
                texto: "Media",
                color: "warning"
            };

        }

        //---------------------------------------------------
        // INDICADOR DEL USUARIO
        //---------------------------------------------------

         let estadoModeracion = {
         texto: "Sin antecedentes",
         color: "success"
};

         if (usuario.publicaciones_bajadas === 1) {
          estadoModeracion = {
        texto: "1 publicación eliminada",
        color: "warning"
    };
}

      if (usuario.publicaciones_bajadas === 2) {
       estadoModeracion = {
        texto: "Al borde de la suspensión",
        color: "danger"
    };
}

        if (!usuario.activo) {
    estadoModeracion = {
        texto: "Usuario suspendido",
        color: "dark"
    };
}

        //---------------------------------------------------
        // RENDER
        //---------------------------------------------------

        res.render("administrador/caso", {

            publicacion,

            denuncias,

            prioridad,

            totalDenuncias,

            estadisticas: {

                likes: totalLikes,

                comentarios: totalComentarios,

                favoritos: totalFavoritos,

                imagenes: publicacion.imagenes.length

            },

            usuarioInfo:{

    username:usuario.username,

    email:usuario.email,

    foto:usuario.foto_perfil,

    biografia:usuario.biografia,

    activo:usuario.activo,

    publicaciones:publicacionesUsuario,

    comentarios:comentariosUsuario,

    favoritos:favoritosUsuario,

    seguidores,

    siguiendo,

    publicacionesBajadas:usuario.publicaciones_bajadas,

    estadoModeracion

}
        });

    }
    catch (error) {

        console.error(error);

        res.redirect("/administrador/publicaciones");

    }

};

// ========================================
// APROBAR PUBLICACIÓN
// ========================================

const aprobarPublicacion = async (req, res) => {

    try {

        const publicacion = await db.Publicacion.findByPk(req.params.id, {

            include: [
                {
                    model: db.Imagen,
                    as: "imagenes"
                }
            ]

        });

        if (!publicacion) {

            return res.redirect("/administrador/publicaciones");

        }

        // Eliminar todas las denuncias de las imágenes
        for (const imagen of publicacion.imagenes) {

            await db.Denuncia.destroy({

                where: {
                    imagen_id: imagen.id
                }

            });

        }

        // Desbloquear publicación
        await publicacion.update({

            bloqueada: false,
            estado_moderacion: "aprobada"

        });

        res.redirect("/administrador/publicaciones");

    } catch (error) {

        console.error(error);

        res.redirect("/administrador/publicaciones");

    }

};

// ========================================
// DAR DE BAJA PUBLICACIÓN
// ========================================

const darDeBajaPublicacion = async (req, res) => {
  try {
    const publicacion = await db.Publicacion.findByPk(req.params.id, {
      include: [
        {
          model: db.User,
          as: "usuario",
        },
      ],
    });

    if (!publicacion) {
      return res.redirect("/administrador/publicaciones");
    }

    // Mantener bloqueada y cerrar comentarios
    await publicacion.update({
      bloqueada: true,
      comentarios_habilitados: false,
      estado_moderacion: "rechazada"
    });

    // Solo contar la primera vez que se da de baja
    if (!publicacion.contabilizada) {
      await publicacion.usuario.increment("publicaciones_bajadas");

      await publicacion.update({
        contabilizada: true,
      });

      await publicacion.usuario.reload();

      // Desactivar usuario al llegar a 3 publicaciones dadas de baja
      if (publicacion.usuario.publicaciones_bajadas >= 3) {
        await publicacion.usuario.update({
          activo: false,
        });
      }
    }

    res.redirect("/administrador/publicaciones");
  } catch (error) {
    console.error(error);
    res.redirect("/administrador/publicaciones");
  }
};


// ========================================
// GESTIÓN DE USUARIOS
// ========================================

const listarUsuarios = async (req, res) => {

    try {

        const usuarios = await db.User.findAll({

             where: {
        rol: "usuario"
    },

            order: [
                ["username", "ASC"]
            ]

        });

        res.render("administrador/usuarios", {

            usuarios,
            session: req.session


        });

    } catch (error) {

        console.error(error);

        res.redirect("/administrador");

    }

};

// ========================================
// CAMBIAR ESTADO DEL USUARIO
// ========================================

const cambiarEstadoUsuario = async (req, res) => {

    try {

        const usuario = await db.User.findByPk(req.params.id);

        if (!usuario) {

            return res.redirect("/administrador/usuarios");

        }

        await usuario.update({

            activo: !usuario.activo

        });

        res.redirect("/administrador/usuarios");

    } catch (error) {

        console.error(error);

        res.redirect("/administrador/usuarios");

    }

};
// ========================================
// EXPORTS
// ========================================

module.exports = {

    dashboard,

    publicaciones,

    verCaso,

    aprobarPublicacion,

    darDeBajaPublicacion,

    listarUsuarios,

    cambiarEstadoUsuario

};