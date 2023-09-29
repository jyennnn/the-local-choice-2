var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// import cors
var cors = require("cors");

require("dotenv").config();
// connect to the database with AFTER the config vars are processed
const db = require("./config/database");

const PORT = process.env.PORT ?? 3000;

var authRouter = require("./routes/auth");
const storeAdminRouter = require("./routes/storeAdmin");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orderRoutes");
const storeUserRouter = require("./routes/storeUser");
const profileRouter = require("./routes/profile");
const stripeRouter = require("./routes/stripe");

// const port = 8000;

var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
// Set up CORS to allow React app to make requests to this API
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/config/stores", storeAdminRouter);
app.use("/", productRouter);
app.use("/orders", orderRouter);
app.use("/stores", storeUserRouter);
app.use("/profile", profileRouter);

app.use("/", stripeRouter);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
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

// removed this line because it was causing the server to crash
// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
db.on('connected', function() {
  // Start the server only when the database is connected
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
module.exports = app;
