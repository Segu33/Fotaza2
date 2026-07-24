const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Conversacion = sequelize.define("Conversacion", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        usuario1_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        usuario2_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {

        tableName: "conversaciones"

    });


    return Conversacion;

};