const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const userModel = require("./UserModel");
const moment = require("moment");
const current = moment().format("YYYY-MM-DD HH:mm:ss");
const nodemailer = require("nodemailer");
const sequelize = new Sequelize("gotrafficdb", "root", "gotraffic&9299", {
  host: "103.57.129.166:3000",
  dialect: "mysql",
});

const UserModel = userModel(sequelize);

//http://localhost:3000/api/user/login
const login = async (phone, password) => {
  try {
    const user = await UserModel.findOne({ where: { phone: phone } });
    if (user) {
      const result = bcrypt.compareSync(password, user.password);
      return result ? user : false;
    }
  } catch (error) {
    console.log("Login error" + error);
    return false;
  }
};

//http://localhost:3000/api/user/loginGoogle
const loginGoogle = async (email, avatar, name) => {
  try {
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      // user.isLogin = true;
      return user;
    } else {
      const newUser = { email, avatar, name };
      const u = new UserModel(newUser);
      await u.save();
      user.isLogin = true;

      return newUser;
    }
  } catch (error) {
    console.log("loginGoogle error" + error);
    return false;
  }
};

//http://localhost:3000/api/user/register
async function register(
  name,
  firstName,
  lastName,
  phone,
  email,
  password,
  gender,
  dob,
  avatar,
  point,
  createdAt,
  updatedAt,
  address,
  longitude,
  latitude,
  status,
  role,
  isLogin,
  isActive,
  verificationCode,
  isVerifiedPhone,
  isVerifiedEmail
) {
  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return false;
      // return res.status(400).json({ message: 'Email already exists' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Create a new user
    const newUser = await UserModel.create({
      name,
      firstName,
      lastName,
      phone,
      email,
      password: hash,
      gender,
      dob,
      avatar,
      point,
      address,
      longitude,
      latitude,
      status,
      role,
      isLogin: false,
      isActive: false,
      verificationCode: null,
      isVerifiedPhone: false,
      isVerifiedEmail: false,
    });

    return newUser;
  } catch (error) {
    console.log("Register error" + error);
    return false;
  }
}
const deleteUser = async (id) => {
  try {
    const user = await UserModel.destroy({ where: { id: id } });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Delete User  error", error);
    return false;
  }
};

const updateUser = async (
  idUser,
  name,
  firstName,
  lastName,
  email,
  gender,
  dob,
  avatar
) => {
  try {
    console.log(
      idUser,
      "name",
      name,
      firstName,
      lastName,
      email,
      gender,
      dob,
      avatar
    );
    const user = await UserModel.findOne({ where: { id: idUser } });
    console.log("user", user);
    if (user) {
      user.name = name ? name : user.name;
      user.firstName = firstName ? firstName : user.firstName;
      user.lastName = lastName ? lastName : user.lastName;

      user.email = email ? email : user.firstName;

      user.gender = gender ? gender : user.gender;
      user.dob = dob ? dob : user.dob;
      user.avatar = avatar ? avatar : user.avatar;

      user.updatedAt = current;

      await user.save();
      console.log("INFO USER:", user);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Update User  error", error);
    return false;
  }
};

const search = async (phone) => {
  try {
    const user = await UserModel.findOne({ where: { phone: phone } });
    console.log("user", user);
    if (user) {
      return user;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getAllUser = async (page, size) => {
  try {
    // return data;
    return await UserModel.findAll();
    //  data.splice(index, 1);
  } catch (error) {
    console.log("List user Got an error: ", error);
    throw error;
  }
};

const changePassword = async (phone, oldPassword, newPassword) => {
  try {
    const user = await UserModel.findOne({ where: { phone } });
    if (!user) {
      return false;
    }
    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return false;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await UserModel.update({ password: hashedPassword }, { where: { phone } });

    return true;
  } catch (error) {
    console.log("Change Password got an error: ", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const user = await UserModel.findByPk(id);
    if (user != null) {
      return user;
    }
    return false;
  } catch (error) {
    console.log("Get product by id error " + error);
    return null;
  }
};

const changeForgotPassword = async (email) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    // Generate a random password
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await UserModel.update({ password: hashedPassword }, { where: { email } });

    // Send the new password to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nguyenvanson2622003@gmail.com",
        pass: "zxaa jgzp fdsn wpjd",
      },
    });

    const mailOptions = {
      from: "nguyenvanson2622003@gmail.com",
      to: email,
      subject: "Go Traffic New Password",
      text: `Your new password is: ${newPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log("Email sent: " + info.response);
      return true;
    });
  } catch (error) {
    console.log("Change Password got an error: ", error);
    throw error;
  }
};
module.exports = {
  login,
  register,
  deleteUser,
  loginGoogle,
  updateUser,
  getAllUser,
  search,
  changePassword,
  getById,
  changeForgotPassword,
};
