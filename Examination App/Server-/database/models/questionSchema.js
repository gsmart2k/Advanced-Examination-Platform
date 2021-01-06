const { options } = require("mongoose")
const mongoose = require("mongoose")

const Schema = mongoose.Schema



const questionsContainerSchema = new Schema({
    question:String,
    question_id:Number,
    options:Array,
    correct:Number
});

const subjectContainerSchema = new Schema({
    English: {questionsContainerSchema},
    Mathematics: {questionsContainerSchema},
});



const SubjectShema = new Schema({
    _id:Number,
    data:Array
})

// <!--  <% for(var j = 0; j < data[i].data[0].Mathematics.question.options.length; j++){ %>
//     <button class="options li"><%= data[i].data[0].Mathematics.options[j] %></button>
//     <input class="correct" type="hidden" value= "" />
// <% } %> -->



const Ques = mongoose.model('ques', SubjectShema)



module.exports = Ques

/** Question[
 * English:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ],
 * Mathematics:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ],
 * Biology:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ],
 * Chemistry:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ],
 * Physics:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ],
 * C.R.S:[
 *         {questionId:Number, question:String, options:Array, correct:String}
 * ]
 * ] */