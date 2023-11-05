var express = require("express");
var router = express.Router();
const carController = require("../../components/Car/CarController");
const upLoadImage = require("../../MiddleWare/UpLoadImage");

//http://localhost:3000/car/api/add
router.post("/add", async (req, res, next) => {
  try {
    const {
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
    } = req.body;
   
    const car = await carController.add(
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
    console.log("====>", car);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: " Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/list-by-id-user?idUser=1
router.get("/list-by-id-user", async (req, res, next) => {
  try {
    const { idUser } = req.query;
    const listCar = await carController.getListCarByIdUser(idUser);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/list-by-id-car-brand?idCarBrand=1
router.get("/list-by-id-car-brand", async (req, res, next) => {
  try {
    const { idCarBrand } = req.query;
    const listCar = await carController.getListCarByIdCarBrand(idCarBrand);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/delete?idCar=1
router.delete("/delete", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.deleteCar(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update?idCar=1
router.put("/update-info-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const {
      numberPlate,
      locationCar,
      latitude,
      longitude,
      description,
      fuelConsumption,
      isDelivery,
      limitKm,
      utilities,
      updatedAt,
    } = req.body;

    const car = await carController.updateCar(
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

    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/list
router.get("/list", async (req, res, next) => {
  try {
    const listCar = await carController.listCar();
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/get-by-id-car?idCar=1
router.get("/get-by-id-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.getById(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/browse?idCar=1
router.put("/browse", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    const car = await carController.browse(idCar);
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/upload-car-images
router.post(
  "/upload-car-images",
  upLoadImage.array("images", 10), // "images" là tên trường trong form để tải lên nhiều hình ảnh, 10 là số lượng tối đa của hình ảnh
  async (req, res, next) => {
    try {
      const files = req.files;
      if (files && files.length >= 4 && files.length <= 10) {
        const links = files.map(
          (file) => `http://103.57.129.166:3000/images/${file.filename}`
        );
        return res.status(200).json({ result: true, links: links });
      }
      return res.status(400).json({ result: false, links: [] });
    } catch (error) {
      console.log("Failed to upload error: " + error);
      return res
        .status(500)
        .json({ result: false, message: "Failed to upload images" });
    }
  }
);

//http://localhost:3000/car/api/upload-single-image
router.post(
  "/upload-single-image",
  [upLoadImage.single("image")],
  async (req, res, next) => {
    try {
      const { file } = req;
      console.log("file", file);
      if (file) {
        const link = `http://103.57.129.166:3000/images/${file.filename}`;
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
//http://localhost:3000/car/api/search-by-city-district-ward
router.get("/search-by-city-district-ward", async (req, res, next) => {
  try {
    const { city, district, ward } = req.body;
    const listCar = await carController.searchByCity(city, district, ward);
    if (listCar) {
      return res
        .status(200)
        .json({ result: true, listCar: listCar, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, listCar: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

//http://localhost:3000/car/api/update-image-car?idCar=1&i
router.put("/update-image-car", async (req, res, next) => {
  try {
    const { idCar } = req.query;
    let { image, imageRegister, imageRegistry, imageInsurance } = req.body;
    // console.log("abc",JSON.stringify(image));
    image = JSON.stringify(image);
    const car = await carController.updateImageCar(
      idCar,
      image,
      imageRegister,
      imageRegistry,
      imageInsurance
    );
    if (car) {
      return res
        .status(200)
        .json({ result: true, car: car, message: "Success" });
    } else {
      return res
        .status(400)
        .json({ result: false, car: null, message: "Failed" });
    }
  } catch (error) {
    console.log("Failed to upload error: " + error);
    return res.status(500).json({ result: false, message: "Error System" });
  }
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Car
 *   description: API for Car operations
 */

/**
 * @swagger
 * /car/api/browse:
 *   put:
 *     tags: [Car]
 *     summary: Browse car details
 *     description: Get details of a car by its ID
 *     parameters:
 *       - in: query
 *         name: idCar
 *         description: ID of the car
 *         required: true
 *         schema:
 *           type: integer
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
 *                 car:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 car:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error System
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
 * /car/api/list:
 *   get:
 *     tags: [Car]
 *     summary: Get list of cars
 *     description: Get a list of all cars
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
 *                 listCar:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 listCar:
 *                   type: null
 *                 message:
 *                   type: string
 *       500:
 *         description: Error System
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
 * /car/api/get-by-id-car:
 *   get:
 *     tags: [Car]
 *     summary: Get car by ID
 *     description: Retrieve a car by its ID
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             car:
 *               type: object
 *               description: The car object
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             car:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-id-user:
 *   get:
 *     tags: [Car]
 *     summary: Get list of cars by user ID
 *     description: Retrieve a list of cars by user ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: array
 *               items:
 *                 type: object
 *               description: The list of cars
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-id-user:
 *   get:
 *     tags: [Car]
 *     summary: Get list of cars by user ID
 *     description: Retrieve a list of cars by user ID
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: array
 *               items:
 *                 type: object
 *               description: The list of cars
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Failed
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             listCar:
 *               type: null
 *               description: Null value
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Error System
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/delete:
 *   delete:
 *     tags: [Car]
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to delete
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The deleted car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/update-info-car:
 *   put:
 *     tags: [Car]
 *     summary: Update car information
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car to update
 *       - in: body
 *         name: car
 *         schema:
 *           type: object
 *           properties:
 *             numberPlate:
 *               type: string
 *             locationCar:
 *               type: string
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *             description:
 *               type: string
 *             fuelConsumption:
 *               type: number
 *             isDelivery:
 *               type: boolean
 *             limitKm:
 *               type: number
 *             utilities:
 *               type: array
 *               items:
 *                 type: string
 *             updatedAt:
 *               type: string
 *               format: date-time
 *         required: true
 *         description: Updated car information
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The updated car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/list-by-id-car-brand:
 *   get:
 *     tags: [Car]
 *     summary: Get a list of cars by car brand ID
 *     parameters:
 *       - in: query
 *         name: idCarBrand
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car brand
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
 *                   description: Indicates if the request was successful
 *                 listCar:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: The list of cars
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 listCar:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/add:
 *   post:
 *     summary: Add a new car
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID of the user
 *               idCarBrand:
 *                 type: string
 *                 description: ID of the car brand
 *               numberPlate:
 *                 type: string
 *                 description: Number plate of the car
 *               name:
 *                 type: string
 *                 description: Name of the car
 *               yearOfManufacture:
 *                 type: integer
 *                 description: Year of manufacture of the car
 *               seats:
 *                 type: integer
 *                 description: Number of seats in the car
 *               gear:
 *                 type: string
 *                 description: Type of gear (manual/automatic)
 *               fuel:
 *                 type: string
 *                 description: Type of fuel (petrol/diesel)
 *               locationCar:
 *                 type: string
 *                 description: Location of the car
 *               latitude:
 *                 type: number
 *                 description: Latitude coordinate of the car's location
 *               longitude:
 *                 type: number
 *                 description: Longitude coordinate of the car's location
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               fuelConsumption:
 *                 type: number
 *                 description: Fuel consumption of the car
 *               isDelivery:
 *                 type: boolean
 *                 description: Indicates if delivery service is available for the car
 *               limitKm:
 *                 type: number
 *                 description: Limit of kilometers allowed for the car
 *               price:
 *                 type: number
 *                 description: Price per day for renting the car
 *               utilities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of utilities available in the car
 *               image:
 *                 type: string
 *                 description: Image URL of the car
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The added car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/update-image-car:
 *   put:
 *     summary: Update the images of a car
 *     tags: [Car]
 *     parameters:
 *       - in: query
 *         name: idCar
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: Image URL of the car
 *               imageRegister:
 *                 type: string
 *                 description: Image URL of the car registration document
 *               imageRegistry:
 *                 type: string
 *                 description: Image URL of the car registry document
 *               imageInsurance:
 *                 type: string
 *                 description: Image URL of the car insurance document
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
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: object
 *                   description: The updated car object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 car:
 *                   type: null
 *                   description: Null value
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Error System
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /car/api/upload-car-images:
 *   post:
 *     tags: [Car]
 *     summary: Upload multiple car images
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The car images to upload (multiple files allowed)
 *         required: true
 *     responses:
 *       200:
 *         description: Successful upload
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             links:
 *               type: array
 *               items:
 *                 type: string
 *               description: The links to the uploaded images
 *       400:
 *         description: Invalid request or insufficient number of images
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             links:
 *               type: array
 *               items:
 *                 type: string
 *               description: The links to the uploaded images
 *       500:
 *         description: Failed to upload images
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             message:
 *               type: string
 *               description: Error message
 */

/**
 * @swagger
 * /car/api/upload-single-image:
 *   post:
 *     tags: [Car]
 *     summary: Upload a single car image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The car image to upload
 *         required: true
 *     responses:
 *       200:
 *         description: Successful upload
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             link:
 *               type: string
 *               description: The link to the uploaded image
 *       400:
 *         description: Invalid request or missing image
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             link:
 *               type: string
 *               description: The link to the uploaded image
 *       500:
 *         description: Failed to upload image
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the upload was successful
 *             message:
 *               type: string
 *               description: Error message
 */
/**
 * @swagger
 * /car/api/search-by-city-district-ward:
 *   get:
 *     tags: [Car]
 *     summary: Search cars by city, district, and ward
 *     parameters:
 *       - in: query
 *         name: city
 *         type: string
 *         description: The city to search for cars in
 *         required: true
 *       - in: query
 *         name: district
 *         type: string
 *         description: The district to search for cars in
 *         required: true
 *       - in: query
 *         name: ward
 *         type: string
 *         description: The ward to search for cars in
 *         required: true
 *     responses:
 *       200:
 *         description: Successful search
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             listCar:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Car'
 *               description: The list of cars matching the search criteria
 *             message:
 *               type: string
 *               description: Success message
 *       400:
 *         description: Invalid request or no cars found
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             listCar:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Car'
 *               description: The list of cars matching the search criteria
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Failed to search cars
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: boolean
 *               description: Indicates if the search was successful
 *             message:
 *               type: string
 *               description: Error message
 * 
 * definitions:
 *   Car:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The ID of the car
 *       make:
 *         type: string
 *         description: The make of the car
 *       model:
 *         type: string
 *         description: The model of the car
 *       year:
 *         type: integer
 *         description: The year of the car
 *       price:
 *         type: number
 *         description: The price of the car
 *       mileage:
 *         type: number
 *         description: The mileage of the car
 *       city:
 *         type: string
 *         description: The city of the car
 *       district:
 *         type: string
 *         description: The district of the car
 *       ward:
 *         type: string
 *         description: The ward of the car
 */

