var mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONFIG, {useNewUrlParser: true});


module.exports = mongoose;
