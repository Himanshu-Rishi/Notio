const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
const app = express()
require('dotenv').config();
const port = process.env.PORT
app.use(cors())
app.use(express.json())

connectToMongo();

// Available routes
app.get('/', (req, res)=>
{
    res.send('Hello User, Welcome to notio')
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));


app.listen(port, ()=>
{
    console.log(`Notio backend is running`)
})
