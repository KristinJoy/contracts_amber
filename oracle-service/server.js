var express = require('express')
var app = express();
var port = 3000;

console.log(".......... Firing up oracle server ..........");

var oracle = require('./src/oracle.js');

console.log(".......... Serving up oracle.js: ", oracle, "..........");

app.listen(port);
