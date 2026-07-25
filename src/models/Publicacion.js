module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Publicacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      descripcion: {
        type: DataTypes.TEXT,
      },

      comentarios_habilitados: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      bloqueada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      estado_moderacion: {
        type: DataTypes.ENUM(
          "pendiente",
          "aprobada",
          "rechazada"
        ),
        defaultValue: "aprobada",
      },

      // Evita contar dos veces la misma publicación
      contabilizada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "publicaciones",
      timestamps: false,
    }
  );
};