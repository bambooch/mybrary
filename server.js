if (process.env.NODE_ENV !== 'production') { //checks if the request is coming from the development environment. it's a bad idea to load a .env inside a production environment 
    require('dotenv').config()//loads the actual .env file. load() could have been used to but the tut advised not to do so.. why?n
}

const express = require('express')
const app = express() //gets the app portion of the express library
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')//library for easily reading data

const indexRouter = require('./routes/index') //fetches the index router from the router folder and binds it to a variable
const authorRouter = require('./routes/authors') //fetches the author router from the router folder and binds it to a variable

app.set('view engine', 'ejs') // sets the view engine for the app to be ejs
app.set('views', __dirname + '/views') //puts all the views in the current directory(dirname) under a subfolder called 'views'
app.set('layout', 'layouts/layout') //layouts are used to duplicate beginning HTML data such as headers and footers. This line sets them to the layouts/layout folder
app.use(expressLayouts)//tells the app to use the layouts provided by ejs
app.use(express.static('public'))//tells the app where the public files such as stylesheets, js etc. will be(in a folder called public)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))//tells the app to use the bodyParser url data reading mechanism, raises the data limit to 10mb and specifies that the data will be encoded in the URL(extended)

const mongoose = require('mongoose')//library for mongoDB interaction
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser:true,
    useUnifiedTopology: true
}) //connects via the database url provided by the .env file and specifies to use the new url parser&unified topology(mongoose uses some deprecated stuff)
const db = mongoose.connection //stores the db connection in a variable
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose')) //this runs only once and upon opening the connection to the db


app.use('/', indexRouter) // specifies which router is handling the request for the root of the app(/)
app.use('/authors', authorRouter) // specifies which router is handling the request for the authors route(/authors)

app.listen(process.env.PORT || 3000) //this line tells the server on which port to listen to.The first option is for when the app is located in a hosting provider environment and the actual server will tell it the port it will be using. 3000 is specified for local development
