module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Interes", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: "intereses",
    timestamps: false,
  });
};