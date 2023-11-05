const carService = require("./CarService");

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
    return await carService.add(
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
    
    );
  } catch (error) {
    return false;
  }
};

const listCar = async () => {
  try {
    return await carService.listCar();
  } catch (error) {
    return false;
  }
};
const getListCarByIdUser = async (idUser) => {
  try {
    return await carService.getListCarByIdUser(idUser);
  } catch (error) {
    return false;
  }
};

const getListCarByIdCarBrand = async (idUser) => {
  try {
    return await carService.getListCarByIdUser(idUser);
  } catch (error) {
    return false;
  }
};

const deleteCar = async (idCar) => {
  try {
    return await carService.deleteCar(idCar);
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
    return await carService.updateCar(
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
    );
  } catch (error) {
    return false;
  }
};

const getById = async (idCar) => {
  try {
    return await carService.getById(idCar);
  } catch (error) {
    return false;
  }
};

const browse = async (idCar) => {
  try {
    return await carService.browse(idCar);
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
    return await carService.updateImageCar(
      idCar,
      image,
      imageRegister,
      imageRegistry,
      imageInsurance
    );
  } catch (error) {
    return false;
  }
};

const searchByCity = async (city,district,ward) => {
  try {
    return await carService.searchByCity(city,district,ward);
  } catch (error) {}
};
module.exports = {
  add,
  getListCarByIdUser,
  getListCarByIdCarBrand,
  deleteCar,
  updateCar,
  browse,
  listCar,
  getById,
  updateImageCar,
  searchByCity
};
