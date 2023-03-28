'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_infos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_infos.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.INTEGER,
    provinceId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.TEXT,
    count: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Doctor_infos',
  });
  return Doctor_infos;
};