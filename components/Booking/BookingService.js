const { Sequelize } = require("sequelize");
const moment = require("moment");
const db = require("../../components/indexModel");
const BookingModel = db.bookings;
const current = moment().format("YYYY-MM-DD HH:mm:ss");

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
    const { Op } = Sequelize;
    const check = await BookingModel.findAll({
      where: {
        idCar: idCar,
        timeFrom: { [Sequelize.Op.lte]: timeTo },
        timeTo: { [Sequelize.Op.gte]: timeFrom },
      },
    });

    if (check.length > 0) {
      return false;
    }

    //api tru coc
    const user = await db.users.findOne({
      where: {
        id: idUser,
      },
    });
    const surplus = user.surplus - totalMoney * 0.3;
    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: idUser,
        },
      }
    );
    
    const booking = await BookingModel.create({
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

const getById = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["id", "name", "phone", "email", "address"],
        },
        {
          model: db.cars,
          as: "Car",
          attributes: ["id", "name", "price", "image", "description", "status"],
        },
      ],
    });
    if (booking === null) {
      return false;
    }

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const accept = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 2, //status = success
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );
    
    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });
    await db.cars.update(
      {
        status: 2,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const process = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 3, //status = process
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const receive = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 4, //status = receive
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const reject = async (id) => {
  try {
    const booking = await BookingModel.update(
      {
        status: 6, //status = reject
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const complete = async (id) => {
  try {
    console.log("id bo", id);
    const booking = await BookingModel.findOne(
     
      {
        where: {
          id: id,
        },
      }
    );
    await BookingModel.update(
      {
        status: 5, //status = complete
        updatedAt: current,
      },
      {
        where: {
          id: booking.id,
        },
      }
    );
    const car = await db.cars.findOne({
      where: {
        id: booking.idCar,
      },
    });
    console.log("car", car);
    await db.cars.update(
      {
        status: 1,
        numberOfBooked: car.numberOfBooked + 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    const booking = await BookingModel.findAll({
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["id", "name", "phone", "email", "address"],
        },
        {
          model: db.cars,
          as: "Car",
          attributes: ["id", "name", "price", "image", "description", "status"],
        },
      ],
    });

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByOwnerId = async (idUser) => {
  try {
    const { Op } = Sequelize;
    const listCar = await db.cars.findAll({
      where: {
        idUser: idUser,
        status: 2,
      },
    });

    if (listCar.length === 0) {
      return false;
    }
    return listCar;

    // const booking = await BookingModel.findOne({
    //   where: {
    //     idCar: idCar, // Điều kiện lấy theo idCar
    //   },
    //   include: [
    //     {
    //       model: db.users,
    //       as: "User",
    //       attributes: ["id", "name", "phone", "email", "address"],
    //     },
    //   ],
    // });

    // if (booking === null) {
    //   return false;
    // }

    // const userId = booking.User.id; // Lấy idUser từ booking
    // console.log("userId", userId);

    // const booking = await BookingModel.findAll({
    //   where: {
    //     idOwner: id,
    //   },
    //   include: [
    //     {
    //       model: db.users,
    //       as: "User",
    //       attributes: ["id", "name", "phone", "email", "address"],
    //     },
    //     {
    //       model: db.cars,
    //       as: "Car",
    //       attributes: [
    //         "id",
    //         "name",
    //         "price",
    //         "image",
    //         "description",
    //         "status",
    //       ],
    //     },
    //   ],
    // });

    // return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getByRenterId = async (idUser) => {
  try {
    const { Op } = Sequelize;
    const listCar = await db.bookings.findAll({
      where: {
        idUser: idUser,
        status: 5,
      },
    });
    if (listCar.length === 0) {
      return false;
    }
    return listCar;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancel = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id, // Điều kiện lấy theo id của booking
      },
    });

    if (!booking) {
      return false; // Booking không tồn tại
    }

    const currentTime = new Date(); // Thời gian hiện tại
    const startTime = new Date(booking.createdAt); // Thời gian bắt đầu gửi yêu cầu thuê xe
    const timeDifference = currentTime - startTime; // Độ chênh lệch thời gian
    // console.log("timeDifference", timeDifference);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Chênh lệch thời gian tính theo giờ
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chênh lệch thời gian tính theo ngày

    let refundAmount = 0; // Số tiền hoàn trả
    const deposit = booking.totalMoney * 0.3; // Số tiền cọc

    // ===================| hoan tra tien coc cho chu xe |===================
    if (hoursDifference >= 2) {
      const car = await db.cars.findOne({
        where: {
          id: booking.idCar,
        },
      });

      const compensationPercentage = daysDifference < 7 ? 0.3 : 1; // Tỷ lệ bồi thường (30% hoặc 100%)
      const compensationAmount = deposit * compensationPercentage; // Số tiền bồi thường

      const owner = await db.users.findOne({
        where: {
          id: car.idUser,
        },
      });

      const ownerSurplus = owner.surplus + compensationAmount;

      await db.users.update(
        {
          surplus: ownerSurplus,
        },
        {
          where: {
            id: car.idUser,
          },
        }
      );
    }

    // ===================| hoan tra tien coc cho nguoi thue |===================
    if (hoursDifference < 2) {
      refundAmount = booking.totalMoney * 0.3; // Hoàn trả 30% tiền cọc
    } else if (hoursDifference >= 2 && daysDifference < 7) {
      refundAmount = booking.totalMoney * 0.7; // Hoàn trả 70% tiền cọc
    } else {
      refundAmount = 0; // Không hoàn trả tiền cọc
    }

    const user = await db.users.findOne({
      where: {
        id: booking.idUser,
      },
    });

    const surplus = user.surplus + refundAmount;
    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: booking.idUser,
        },
      }
    );
    // ===========================| cap nhat trang thai xe va booking |===========================
    await db.cars.update(
      {
        status: 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );

    await BookingModel.update(
      {
        status: 7, //status = cancel
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return booking;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const cancelByOwner = async (id) => {
  try {
    const booking = await BookingModel.findOne({
      where: {
        id: id, // Điều kiện lấy theo id của booking
      },
    });

    if (!booking) {
      return false; // Booking không tồn tại
    }

    const currentTime = new Date(); // Thời gian hiện tại
    const startTime = new Date(booking.startTime); // Thời gian bắt đầu gửi yêu cầu thuê xe
    const timeDifference = currentTime - startTime; // Độ chênh lệch thời gian

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Chênh lệch thời gian tính theo giờ
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chênh lệch thời gian tính theo ngày

    let refundAmount = 0; // Số tiền hoàn trả
    const deposit = booking.totalMoney * 0.3; // Số tiền cọc
    if (hoursDifference < 2) {
      refundAmount = 0; // Không đền tiền cọc
    } else if (hoursDifference >= 2 && daysDifference < 7) {
      refundAmount = deposit * 0.3; // Đền 30% tiền cọc
    } else {
      refundAmount = deposit; // Đền 100% tiền cọc
    }

    // Thực hiện các thao tác đền tiền cọc, ví dụ: cập nhật trạng thái, gửi thông báo, v.v.
    console.log("refundAmount", refundAmount);
    const user = await db.users.findOne({
      where: {
        id: booking.idUser,
      },
    });
    const surplus = user.surplus + refundAmount;
    await db.users.update(
      {
        surplus: surplus,
      },
      {
        where: {
          id: booking.idUser,
        },
      }
    );
    await db.cars.update(
      {
        status: 1,
      },
      {
        where: {
          id: booking.idCar,
        },
      }
    );
    await BookingModel.update(
      {
        status: 7, //status = cancel
        updatedAt: current,
      },
      {
        where: {
          id: id,
        },
      }
    );
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
