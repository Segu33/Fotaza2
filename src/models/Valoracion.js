module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Valoracion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
  }, {
    tableName: "valoraciones",
    timestamps: false,
  });
};