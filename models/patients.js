const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Patient = sequelize.define("patients", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
