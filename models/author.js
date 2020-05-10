const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({  //defines the schema(NoSQL variant for table) specifiying the column (name) with its type and required properties in JSON format
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema) //export the schema/model for reuse in other parts of the app with the table/schema name of 'Author'