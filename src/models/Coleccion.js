module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coleccion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: "colecciones",
    timestamps: false,
  });
};