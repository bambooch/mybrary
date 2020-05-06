const express = require('express')
const router = express.Router() //sets the router portion of the express library to a variable

router.get('/', (req, res) => { //this handles the get request for the route(/) of the app
    res.render('index') //renders the index view
})

module.exports = router //this specifies the behaviour of this file when it is imported elsewhere. the location that imports the file(a variable) is assigned the router variable holding the router part of express