const mongoose = require("mongoose")

const Schema = mongoose.Schema



const userSchema =  new Schema({
    _id:Number,
    username:String,
    password: String,
    userScore:Number,
    userMin:Number,
    userSec:Number
})



const users = mongoose.model('userDetails', userSchema)

module.exports = users
