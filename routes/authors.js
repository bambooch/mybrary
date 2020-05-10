//uses similar code to index.js

const express = require('express')
const router = express.Router()
const Author = require('../models/author') //imports the author schema from the author model and creates an object(Author) that can be used to manipulate data

//all authors route
router.get('/', async (req, res) => {
    let searchOptions = {} //instantiates the object used for picking up search queries
    if(req.query.name != null && req.query.name !== '') //checks if the input field is empty or null
    {
        searchOptions.name = new RegExp(req.query.name, 'i') //sets the name of the searchOptions object to a new regex object
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//create author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect(`authors`) //currently redirects to the root authors view
            //res.redirect(`authors/${newAuthor.id`) //should display the new entry data
    } catch { //if there is an error with the model, display the same view, populate it with the sent data and display an error message
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router