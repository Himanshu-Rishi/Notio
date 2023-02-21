require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/notio";
// const mongoURL = process.env.REACT_APP_STRING;

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to database succesfully.");
  });
};

module.exports = connectToMongo;