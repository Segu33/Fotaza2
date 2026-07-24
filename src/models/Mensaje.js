const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Mensaje = sequelize.define("Mensaje", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        conversacion_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        remitente_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        leido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, {

        tableName: "mensajes"

    });


    return Mensaje;

};