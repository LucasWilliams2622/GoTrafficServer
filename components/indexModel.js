const { Sequelize, DataTypes } = require("sequelize");

// connect to db
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//===================| Models/tables |================
db.users = require("./User/UserModel")(sequelize, DataTypes);
db.carbrands = require("./CarBrand/CarBrandModel")(sequelize, DataTypes);
db.cars = require("./Car/CarModel")(sequelize, DataTypes);
db.bookings = require("./Booking/BookingModel")(sequelize, DataTypes);
db.favoritecars = require("./FavoriteCar/FavoriteCarModel")(
  sequelize,
  DataTypes
);
db.reviews = require("./Review/ReviewModel")(sequelize, DataTypes);

//====================| Associations |=================
db.users.hasMany(db.cars, { foreignKey: "idUser", as: "Car" });
db.cars.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

db.reviews.belongsTo(db.bookings, { foreignKey: "idBooking", as: "Booking" });
db.bookings.hasMany(db.reviews, { foreignKey: "idBooking", as: "Review" });

db.reviews.belongsTo(db.users, { foreignKey: "idUser", as: "User" });
db.users.hasMany(db.reviews, { foreignKey: "idUser", as: "Review" });

db.cars.hasMany(db.favoritecars, { foreignKey: "idCar", as: "FavoriteCar" });
db.favoritecars.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });

db.bookings.belongsTo(db.cars, { foreignKey: "idCar", as: "Car" });
db.users.hasMany(db.bookings, { foreignKey: "idUser", as: "Booking" });

db.cars.hasMany(db.bookings, { foreignKey: "idCar", as: "Booking" });
db.bookings.belongsTo(db.users, { foreignKey: "idUser", as: "User" });

// db.sequelize.sync({ force: false,alter: true })
// .then(() => {
//     console.log('yes re-sync done!')
// })
module.exports = db;
