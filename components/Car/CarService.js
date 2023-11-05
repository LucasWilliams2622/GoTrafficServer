const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});
const db = require("../../components/indexModel");
const CarModel = db.cars;

//http://localhost:3000/api/car/add
const add = async (
  idUser,
  idCarBrand,
  numberPlate,
  name,
  yearOfManufacture,
  seats,
  gear,
  fuel,

  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  isDelivery,
  limitKm,
  price,
  utilities,
  image,
  
) => {
  try {
    const existCar = await CarModel.findOne({
      where: { numberPlate: numberPlate },
    });
    console.log("existCar", existCar);
    if (existCar) {
      return false;
    }
    const car = await CarModel.create({
      idUser,
      idCarBrand,
      numberPlate,
      name,
      yearOfManufacture,
      seats,
      gear,
      fuel,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      limitKm,
      price,
      utilities,
      image,
    
    });
    console.log("car", car);
    return car;
  } catch (error) {
    console.log("error" + error);
    return false;
  }
};

const listCar = async () => {
  try {
    return await CarModel.findAll({
      where: {
        isBrowed: true,
      },
      limit: 10,
    });
  } catch (error) {
    return false;
  }
};

const getListCarByIdUser = async (idUser) => {
  try {
    const listCar = await CarModel.findAll({ where: { idUser: idUser } });
    if (listCar.length == 0) {
      return false;
    }

    return listCar;
  } catch (error) {
    return false;
  }
};

const getListCarByIdCarBrand = async (idCarBrand) => {
  try {
    const listCar = await CarModel.findAll({
      where: { idCarBrand: idCarBrand },
    });
    if (listCar.length == 0) {
      return false;
    }

    return listCar;
  } catch (error) {
    return false;
  }
};

const deleteCar = async (idCar) => {
  try {
    const car = await CarModel.destroy({ where: { id: idCar } });
    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateCar = async (
  idCar,
  numberPlate,
  locationCar,
  latitude,
  longitude,
  description,
  fuelConsumption,
  isDelivery,
  limitKm,
  utilities,
  updatedAt
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });

    // console.log("existCar", car);
    // console.log("234", car);
    if (car) {
      car.numberPlate = numberPlate ? numberPlate : car.numberPlate;
      car.locationCar = locationCar ? locationCar : car.locationCar;
      car.latitude = latitude ? latitude : car.latitude;
      car.longitude = longitude ? longitude : car.longitude;
      car.description = description ? description : car.description;

      car.fuelConsumption = fuelConsumption
        ? fuelConsumption
        : car.fuelConsumption;
      car.isDelivery = isDelivery ? isDelivery : car.isDelivery;
      car.limitKm = limitKm ? limitKm : car.limitKm;
      car.utilities = utilities ? utilities : car.utilities;
      car.updatedAt = updatedAt ? updatedAt : car.updatedAt;
      await car.save();
      console.log("car after", car);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getById = async (idCar) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const browse = async (idCar) => {
  try {
    const carId = parseInt(idCar);
    console.log("carId", carId);
    const car = await CarModel.findOne({ where: { id: idCar } });
    if (car) {
      car.isBrowed = true;
      car.updatedAt = new Date();
      await car.save();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateImageCar = async (
  idCar,
  image,
  imageRegister,
  imageRegistry,
  imageInsurance
) => {
  try {
    const car = await CarModel.findOne({ where: { id: idCar } });
    console.log("car", car);
    if (car) {
      car.image = image ? image : car.image;
      car.imageRegister = imageRegister ? imageRegister : car.imageRegister;
      car.imageRegistry = imageRegistry ? imageRegistry : car.imageRegistry;
      car.imageInsurance = imageInsurance ? imageInsurance : car.imageInsurance;
      await car.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const searchByCity = async (city,district,ward) => {
  try {
    const { Op } = require("sequelize");
    const car = await CarModel.findAll({
      limit: 10,
      where: {
        city: {
          [Op.substring]: city,
        },
        district:{
          [Op.substring]: district,
        },
        ward:{
          [Op.substring]: ward,
        }
      },
    });

    if (car) {
      return car;
    }
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  add,
  getListCarByIdUser,
  getListCarByIdCarBrand,
  deleteCar,
  updateCar,
  listCar,
  getById,
  browse,
  updateImageCar,
  searchByCity,
};
