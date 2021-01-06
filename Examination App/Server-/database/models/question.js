const mongoose = require("mongoose")
const Ques = require("./questionSchema")

const ques = new Ques({
    _id:32,
    data:{
       English: [
           {question:"String", options:["Array","Array","Array"], correct:"String"},
           {question:"String", options:["Array","Array","Array"], correct:"String"}
       ],
       Mathematics: [
        {question:"String", options:["Array","Array","Array"], correct:"String"},
        {question:"String", options:["Array","Array","Array"], correct:"String"}
    ]
    }
    
})
// ques.save().then((result)=>{
//     console.log(result.data[0].Mathematics)
// })

module.exports =  ques
