let createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql2/promise");
var indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
const config = require("./config.json");
const session = require("express-session");
const { Sequelize, DataTypes } = require("sequelize");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database, dialect } = config.database;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
  });

  // init models and add them to the exported db object

  await sequelize.sync({ alter: true });
  
  try {
    await sequelize.authenticate();
    console.log("===> Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GoTraffic API",
      version: "1.0.0",
      description: "This is Go Traffic API documentation.",
    },
    servers: [
      {
        url: "http://103.57.129.166:3000",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJSDoc(options);

// API
let UserAPIRouter = require("./routes/api/UserAPI");
let CarBrandAPIRouter = require("./routes/api/CarBrandAPI");
let CarAPIRouter = require("./routes/api/CarAPI");
let BookingAPIRouter = require("./routes/api/BookingAPI");
let FavoriteCarAPIRouter = require("./routes/api/FavoriteCarAPI");
let ReviewAPIRouter = require("./routes/api/ReviewAPI");

// CPANEL

var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/", indexRouter);
// API
// http://localhost:3000/user/api
app.use("/user/api", UserAPIRouter);

// http://localhost:3000/car-brand/api
app.use("/car-brand/api", CarBrandAPIRouter);

// http://localhost:3000/car/api
app.use("/car/api", CarAPIRouter);

// http://localhost:3000/car/api
app.use("/booking/api", BookingAPIRouter);

// http://localhost:3000/favorite-car/api
app.use("/favorite-car/api", FavoriteCarAPIRouter);

// http://localhost:3000/review/api
app.use("/review/api", ReviewAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
