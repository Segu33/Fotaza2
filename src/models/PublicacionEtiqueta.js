module.exports = (sequelize, DataTypes) => {
  return sequelize.define("PublicacionEtiqueta", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: "publicacion_etiquetas",
    timestamps: false,
  });
};