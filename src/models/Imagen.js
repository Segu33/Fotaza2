module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Imagen", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    licencia: {
      type: DataTypes.ENUM("copyright", "libre"),
      allowNull: false,
    },
    marca_agua: { type: DataTypes.STRING },
  }, {
    tableName: "imagenes",
    timestamps: false,
  });
};