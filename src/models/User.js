module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    publicaciones_bajadas: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    rol: {
      type: DataTypes.ENUM(
        "usuario",
        "administrador"
      ),
      defaultValue: "usuario"
    }

  }, {

    tableName: "usuarios",
    timestamps: false

  });

};