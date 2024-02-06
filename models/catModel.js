//controllers - the brain of the app, whre the logic is done - this is a schema

const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFood: String,
    funFact: String,
    image: String
})

//wrapping the schema into a model
//cluster-database-collection-doucments  hierarchy

module.exports = mongoose.model('Cat', catSchema) 