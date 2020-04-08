const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")
const mongoose = require("mongoose")

const config = require("./config/database")

//connect to database
mongoose.connect(config.database)

mongoose.connection.on("connected", ()=> {
    console.log("connect to database" +config.database)
})

mongoose.connection.on("error", (err)=> {
    console.log("database error:" +err)
})

const app = express()

const users = require('./routes/users')

const  port = 3000
//cors middleware
app.use(cors())

//Bode parser middle ware
app.use(bodyParser.json())

// set static folder
app.use(express.static(path.join(__dirname, "public")))

app.use("/users", users)
//index route
app.get('/', (req, res) => {
    res.send("Invalid end point")
})
app.listen(port, ()=> {
    console.log(`server started on ${port}`)
})
