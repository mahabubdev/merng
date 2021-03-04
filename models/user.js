const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true, minLength: 5},
    email: {type: String, required: true, minLength: 10, unique: true},
    password: {type: String, required: true, minLength: 6}
})

module.exports = model('User', userSchema)