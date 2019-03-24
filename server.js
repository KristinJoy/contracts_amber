var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var getUser = require("./routes/getUser");
var updateUser = require("./routes/updateUser");
var addContract = require("./routes/addContract");
var contract = require("./routes/contract");
var oracleContract = require("./routes/oracleContract");

var app = express();
var http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/getUser", getUser);
app.use("/updateUser", updateUser);
app.use("/addContract", addContract);
app.use("/contract", contract);
app.use("/oracleContract", oracleContract);

let port = process.env.PORT || 3001;

var oracle = require('./oracle-service/src/oracle.js');

http.listen(port, function() {
  console.log("listening on *: " + port);
});
