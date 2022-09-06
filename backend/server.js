const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const path = require("path");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Allow control middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var cors = require("cors");
app.use(cors()); // Use this after the variable declaration

app.use("/admin", require("./routes/adminRoutes"));
app.use("/admin-login", require("./routes/loginRoutes"));
app.use("/", require("./routes/userRoutes"));

app.use(errorHandler);

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port " + port));
