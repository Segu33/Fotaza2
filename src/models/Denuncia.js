module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Denuncia", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    motivo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
  }, {
    tableName: "denuncias",
    timestamps: false,
  });
};