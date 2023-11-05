// const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define("Car", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCarBrand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberPlate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có biển số",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có tên",
    },

    yearOfManufacture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2010,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
    },
    gear: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Tự động",
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Xăng",
    },
    // ========================| Step 2 |======================== //
    locationCar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Hà Nội",
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có địa chỉ",
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 21.027763,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 105.83416,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Không có mô tả",
    },
    fuelConsumption: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    limitKm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    utilities: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "[]",
    },
    // ========================| Step 3 |======================== //
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageRegister: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageRegistry: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    imageInsurance: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    status: {
      // 1 chua cho thue, 2 dang cho thue,
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    numberOfBooked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isRental: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isBrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
  });
  return Car;
};
