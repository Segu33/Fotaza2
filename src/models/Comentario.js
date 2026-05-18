module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comentario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    texto: { type: DataTypes.TEXT, allowNull: false },
  }, {
    tableName: "comentarios",
    timestamps: false,
  });
};