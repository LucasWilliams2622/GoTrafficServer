// const { Sequelize, Model, DataTypes } = require("sequelize");
// module.exports = model;
// const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
//   host: "103.57.129.166:3000",
//   dialect: "mysql",
// });

module.exports = (sequelize, DataTypes) => {
  const BookingCar = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    timeFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeTo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeDelivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeInsurance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    feeService: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      // 1 pedding (dax gui yeu cau muon thue xe | chu xe chua dong y cho thue),
      // 2 success (chu xe dong y cho thue), 
      // 3 process (dang giao xe),
      // 4 received (khach hangf da nhan xe),
      // 5 done (khach hang da tra xe va chu xe nhan du tien),
      // 6 deny (chu xe tu choi cho thue),
      // 7 cancel (khach hang huy chuyen),
      // 8 cancelByOwner (chu xe huy chuyen),
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Hà Nội",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      // defaultValue: Sequelize.NOW,
    },
  });

  // const options = {};
  return BookingCar;
  // return sequelize.define("booking", attributes, options);
};
