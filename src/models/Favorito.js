module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Favorito", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: "favoritos",
    timestamps: false,
  });
};