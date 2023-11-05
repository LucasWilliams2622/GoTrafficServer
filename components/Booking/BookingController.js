const BookingService = require("./BookingService");

const add = async ({
  idUser,
  idCar,
  timeFrom,
  timeTo,
  status,
  location,
  totalDay,
  totalMoney,
  feeDelivery,
}) => {
  try {
    const booking = await BookingService.add({
      idUser,
      idCar,
      timeFrom,
      timeTo,
      status,
      location,
      totalDay,
      totalMoney,
      feeDelivery,
    });
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const accept = async (id) => {
  try {
    const booking = await BookingService.accept(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const process = async (id) => {
  try {
    const booking = await BookingService.process(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const receive = async (id) => {
  try {
    const booking = await BookingService.receive(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const complete = async (id) => {
  try {
    const booking = await BookingService.complete(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const reject = async (id) => {
  try {
    const booking = await BookingService.reject(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    const booking = await BookingService.getById(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const booking = await BookingService.getAll();
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByOwnerId = async (id) => {
  try {
    const booking = await BookingService.getByOwnerId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByRenterId = async (id) => {
  try {
    const booking = await BookingService.getByRenterId(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancel = async (id) => {
  try {
    const booking = await BookingService.cancel(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancelByOwner = async (id) => {
  try {
    const booking = await BookingService.cancelByOwner(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  add,
  accept,
  process,
  receive,
  reject,
  complete,
  getById,
  getAll,
  getByOwnerId,
  getByRenterId,
  cancel,
  cancelByOwner,
};
