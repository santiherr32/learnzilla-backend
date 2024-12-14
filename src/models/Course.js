const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "course",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "El nombre no puede estar vacío" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 500],
            msg: "La descripción debe tener entre 10 y 500 caracteres",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "El precio debe ser un número entero" },
          min: {
            args: [1],
            msg: "El precio debe ser mayor a 0",
          },
        },
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: { msg: "La URL de la imagen no es válida" },
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      hooks: {
        beforeCreate: (course) => {
          course.name = course.name.trim(); // Normaliza el nombre
        },
        beforeUpdate: (course) => {
          course.name = course.name.trim();
        },
      },
    }
  );
};
