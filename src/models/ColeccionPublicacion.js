module.exports = (sequelize, DataTypes) => {

    return sequelize.define("ColeccionPublicacion", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }

    }, {

        tableName: "coleccion_publicacion",
        timestamps: false

    });

};