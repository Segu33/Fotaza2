module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Follow", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: "followers",
    timestamps: false,
  });
};