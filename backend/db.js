require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://himanshurishi:rishi123@cluster0.qv3j0wb.mongodb.net/notio"
const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to database succesfully.");
  });
};

module.exports = connectToMongo;