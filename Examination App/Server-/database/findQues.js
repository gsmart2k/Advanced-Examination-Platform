const mongoose = require("mongoose")
const question = require("./models/questionSchema")
const assert = 

// const find = describe('Finding Records',()=>{

    console.log("Finding Records")

    it('Finds Record',()=>{
        question.findOne({subject:"English"}).then((result)=>{
            console.log(result)
        })
    })
// })

module.exports = find