module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Notificacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tipo: { type: DataTypes.STRING, allowNull: false },
    leida: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: "notificaciones",
    timestamps: false,
  });
};