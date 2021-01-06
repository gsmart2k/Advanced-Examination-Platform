const users = require("../users")
const userSchema = require("./usersSchema")
var questionReal = require("./models/questionSchema")



const inputUser = new userSchema ({
    _id:5,
    username:"Joshua",
    password:"Joshua",
    userScore: null,
    userMin:20,
    userSec: 00,
})

inputUser.save().then((result)=>{
    console.log("saved"+result)
})
module.exports = inputUser

// find from database, the questions related to each usersSubject 
//  so for userQuestions [ 
  //  {Subject:"English", questionId:, correct:"a"},
    //  {Subject:"English", question:"lorem lorem lore lorem", options:["a","b","c"], correct:"a"},
// ]

