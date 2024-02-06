
//require statements:
require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const catRoutes = require('./routes/catRoutes')
const PORT = process.env.PORT || 3500

connectDB()

//middlewares = reads requests and processes in a certain way, a translator
app.use(express.json())    //helps upack some objects
app.use(express.urlencoded({extended: true}))        //helps form data comes correctly

app.use(express.static('public'))     //"static" = does not change; tell the app where files will be located

//ejs: helps update page dynamicly
app.set('view engine', 'ejs')    //ejs helps generate dinamic html pages based on information we get from database

app.use('/',catRoutes)

//it makes sure we have a mongoDB connection before we start the server - mongoose.connection.once:
mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB')
//run server locally:
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})