const mongoose = require('mongoose');
const mongoURL = process.env.mongodb_string;

const connectToMongo = () =>
{
    mongoose.connect(mongoURL, ()=>
    {
        console.log("connected to mongo succesfully")
    })
}

module.exports = connectToMongo