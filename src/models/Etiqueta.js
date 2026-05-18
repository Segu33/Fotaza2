module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Etiqueta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    tableName: "etiquetas",
    timestamps: false,
  });
};