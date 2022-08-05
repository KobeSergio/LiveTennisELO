const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Allow control middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.use("/admin", require("./routes/recordRoutes"));
//app.use("/admin/players", require("./routes/playerRoutes"));
app.use("/admin-login", require("./routes/loginRoutes")); 

app.use(errorHandler);

app.listen(port, () => console.log("Server started on port " + port));
