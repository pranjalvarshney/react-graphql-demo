const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    instructions: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Recipe',recipeSchema)
