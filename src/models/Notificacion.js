module.exports = (sequelize, DataTypes) => {

    const Notificacion = sequelize.define(
        "Notificacion",
        {

            tipo:{
                type:DataTypes.ENUM(
                    "comentario",
                    "valoracion",
                    "follow",
                    "interes",
                    "bloqueo",
                    "mensaje",
                ),
                allowNull:false
            },

            leida:{
                type:DataTypes.BOOLEAN,
                defaultValue:false
            },

            user_id:{
                type:DataTypes.INTEGER,
                allowNull:false
            },

            actor_id:{
                type:DataTypes.INTEGER,
                allowNull:false
            },

            publicacion_id:{
                type:DataTypes.INTEGER,
                allowNull:true
            },

            imagen_id:{
                type:DataTypes.INTEGER,
                allowNull:true
            },

            conversacion_id: {
               type: DataTypes.INTEGER,
               allowNull: true
            },

        },
        {
            tableName:"notificaciones",
            underscored:true
        }
    );

    return Notificacion;

};