const connectToMongo = require("./db")
const express = require("express")
const cors = require("cors")
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

connectToMongo();

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));


app.listen(port, ()=>
{
    console.log(`Notio backend is running`)
})
