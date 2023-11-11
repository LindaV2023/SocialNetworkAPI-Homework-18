const mongoose = require("mongoose");
const db = require("../models");
const {connect, connection} = require("mongoose");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/studentsDB";

connect(connectionString);

module.exports = connection;




