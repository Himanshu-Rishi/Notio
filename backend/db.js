require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to database succesfully.");
  });
};

module.exports = connectToMongo;