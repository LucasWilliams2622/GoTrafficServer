var express = require("express");
var router = express.Router();
const upLoadImage = require("../../MiddleWare/UpLoadImage");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userController = require("../../components/User/UserController");

//http://localhost:3000/user/api/login
router.post("/login", async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    console.log(phone, password);
    const user = await userController.login(phone, password);
    console.log("aaaaaaaaa", user);
    if (user) {
      const token = jwt.sign({ user }, "secret", { expiresIn: "1h" });
      return res.status(200).json({
        result: true,
        user: user,
        token: token,
        message: "Login Success",
      });
    } else {
      return res.status(400).json({
        result: false,
        user: null,
        token: null,
        message: "Login Failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});
//http://localhost:3000/user/api/loginGoogle
router.post("/loginGoogle", async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;

    const user = await userController.loginGoogle(email, name, avatar);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Login Google Success" });
    }
    return res.status(200).json({
      result: false,
      user: null,
      token: null,
      message: "Login Google Failed",
    });
  } catch (error) {
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/user/api/register
router.post("/register", [], async (req, res, next) => {
  try {
    const {
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
      isVerifiedEmail,
    } = req.body;

    const user = await userController.register(
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
    );
    console.log(user);

    if (user) {
      await userController.sendMailForNewAccount(email);
      return res
        .status(200)
        .json({ result: true, user: user, message: "Register Success" });
    }
    return res
      .status(400)
      .json({ result: false, user: null, message: "Register Failed" });
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});

// http://localhost:3001/user/api/get-by-id/
router.get("/get-by-id/", async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await userController.getById(id);
    if (user) {
      return res.status(200).json({ result: true, user: user, error: false });
    }
    return res.status(400).json({ result: false, user: null, error: true });
  } catch (error) {
    return res.status(500).json({ result: false, product: null });
  }
});

//http://localhost:3000/user/api/update
router.put("/update", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const { name, firstName, lastName, email, gender, dob, avatar } = req.body;

    const user = await userController.updateUser(
      idUser,
      name,
      firstName,
      lastName,
      email,
      gender,
      dob,
      avatar
    );
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Update Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: " user not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/list
router.get("/list", async (req, res, next) => {
  try {
    const users = await userController.getAllUser();
    console.log(users);
    return res.status(200).json({ result: true, users: users });
  } catch (error) {
    console.log("List User:" + error);
    return res
      .status(500)
      .json({ result: false, massage: "Can't get list user" });
  }
});

//http://localhost:3000/user/api/send-mail
router.post("/send-mail", async (req, res, next) => {
  try {
    const { email, subject } = req.body;
    let content = "<h1>Wellcome to ... <h1>";
    const result = await userController.sendMail(email, subject, content);
    return res.status(200).json({ result: result });
  } catch (error) {
    console.log("MAIL:" + error); //API
    return res
      .status(500)
      .json({ result: false, massage: "Can't get list user" }); //app
  }
});

//http://localhost:3000/user/api/search
router.get("/search", async (req, res, next) => {
  try {
    let { phone } = req.query;
    const user = await userController.search(phone);
    if (user) {
      res
        .status(200)
        .json({ message: "Search Success", result: true, user: user });
    } else {
      res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, massage: "Failed to search" });
  }
});

//http://localhost:3000/user/api/delete
//Shouldn't use this cause data is money
router.delete("/delete", async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await userController.deleteUser(id);
    if (user) {
      res.status(200).json({ result: true, message: "Delete Success" });
    } else {
      res.status(400).json({ result: false, massage: "Delete Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, massage: "Error System" });
  }
});

//http://localhost:3000/user/api/upload-avatar
router.post(
  "/upload-avatar",
  [upLoadImage.single("image")],
  async (req, res, next) => {
    try {
      const { file } = req;
      if (file) {
        const link = `http://10.0.2.2:3000/images/${file.filename}`;
        return res.status(200).json({ result: true, link: link });
      }
      return res.status(400).json({ result: false, link: null });
    } catch (error) {
      console.log("Failed to updaload error:" + error);
      return res
        .status(500)
        .json({ result: false, massage: "Failed to updaload avatar" });
    }
  }
);

//http://localhost:3000/user/api/change-password
router.put("/change-password", [], async (req, res, next) => {
  try {
    const { phone, oldPassword, newPassword } = req.body;
    const user = await userController.changePassword(
      phone,
      oldPassword,
      newPassword
    );
    if (user) {
      res
        .status(200)
        .json({ result: true, message: "Change Password Success" });
    } else {
      res
        .status(400)
        .json({ result: false, massage: "Change Password Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

//http://localhost:3000/user/api/forgot-password
router.put("/forgot-password", [], async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userController.changeForgotPassword(email);
    if (user) {
      res
        .status(200)
        .json({ result: true, message: "Change Forgot Password Success" });
    } else {
      res
        .status(200)
        .json({ result: true, massage: "Change Forgot Password Success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

//http://localhost:3000/user/api/send-verification-code
router.post("/send-verification-code", async (req, res) => {
  try {
    const { email } = req.query;
    let subject = "Go Traffic Account Verification";
    const verifyCode = Math.floor(Math.random() * 900000) + 100000;
    console.log("=======>", verifyCode);
    const result = await userController.sendVerifyCode(
      email,
      subject,
      verifyCode
    );
    if (result) {
      return res.status(200).json({ message: "Send Success", result: result });
    }
    return res.status(400).json({ message: "Send Failed", result: result });
  } catch (error) {
    console.log("MAIL:" + error); //API
    return res.status(500).json({ result: false, massage: "ERROR Send" }); //app
  }
});

//http://localhost:3000/user/api/verify-email
router.post("/verify-email", async (req, res) => {
  try {
    const { email, verifyCode } = req.body;
    console.log(email, verifyCode);
    const result = await userController.verifyCode(email, verifyCode);
    if (result) {
      return res
        .status(200)
        .json({ message: "Verify Success", result: result });
    }
    return res.status(400).json({ message: "Verify Failed", result: result });
  } catch (error) {
    console.log("MAIL:" + error); //API
    return res.status(500).json({ result: false, massage: "ERROR Verify" }); //app
  }
});

//http://localhost:3000/user/api/disable
router.put("/disable", async (req, res, next) => {
  try {
    //const { email } = req.params;
    const { email, isActive } = req.body;
    console.log(email, isActive);
    const user = await userController.disableAccount(email, isActive);
    console.log(user);
    if (user) {
      return res
        .status(200)
        .json({ result: true, user: user, message: "Disabled" });
    } else {
      return res
        .status(400)
        .json({ result: false, user: null, message: " user not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

//http://localhost:3000/user/api/logout
router.put("/logout", async (req, res, next) => {
  try {
    res.clearCookie("jwt");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, user: null });
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for User operations
 */
/**
 * @swagger
 * /user/api/login:
 *   post:
 *     tags: [User]
 *     summary: User login
 *     description: Login with phone and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *                 token:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /user/api/logout:
 *   put:
 *     tags: [User]
 *     summary: User logout
 *     description: Logout the user and clear the JWT cookie
 *     responses:
 *       200:
 *         description: Logout success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 */

/**
 * @swagger
 * /user/api/register:
 *   post:
 *     tags: [User] 
 *     summary: User registration
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *               avatar:
 *                 type: string
 *               point:
 *                 type: number
 *               createdAt:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *               address:
 *                 type: string
 *               longitude:
 *                 type: number
 *               latitude:
 *                 type: number
 *               status:
 *                 type: string
 *               role:
 *                 type: string
 *               isLogin:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *               verificationCode:
 *                 type: string
 *               isVerifiedPhone:
 *                 type: boolean
 *               isVerifiedEmail:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Registration success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 */
/**
 * @swagger
 * /user/api/list:
 *   get:
 *     tags: [User] 
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 users:
 *                   type: null
 */

/**
 * @swagger
 * /user/api/update:
 *   put:
 *     tags: [User] 
 *     summary: Update user information
 *     description: Update user information by ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: User not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 */
/**
 * @swagger
 * /user/api/get-by-id/:
 *   get:
 *     tags: [User] 
 *     summary: Get user by ID
 *     description: Retrieve user information by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 error:
 *                   type: boolean
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *                 error:
 *                   type: boolean
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 product:
 *                   type: null
 */

/**
 * @swagger
 * /user/api/delete:
 *   delete:
 *     tags: [User] 
 *     summary: Delete user
 *     description: Delete user by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Delete success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Delete failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /user/api/send-verification-code:
 *   post:
 *     tags: [User] 
 *     summary: Send verification code
 *     description: Send verification code to user's email
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email
 *     responses:
 *       200:
 *         description: Send success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: boolean
 *       400:
 *         description: Send failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: boolean
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /user/api/verify-email:
 *   post:
 *     tags: [User] 
 *     summary: Verify email
 *     description: Verify user's email with the provided verification code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               verifyCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verify success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: boolean
 *       400:
 *         description: Verify failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: boolean
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /user/api/change-password:
 *   put:
 *     tags: [User] 
 *     summary: Change password
 *     description: Change user's password
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid old password or failed to change password
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/api/forgot-password:
 *   put:
 *     tags: [User] 
 *     summary: Forgot password
 *     description: Send a password reset email to the user's email address
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/api/search:
 *   get:
 *     tags: [User] 
 *     summary: Search user by phone number
 *     description: Search for a user by their phone number
 *     parameters:
 *       - in: query
 *         name: phone
 *         description: User's phone number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: object
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 user:
 *                   type: null
 *       500:
 *         description: Failed to search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */