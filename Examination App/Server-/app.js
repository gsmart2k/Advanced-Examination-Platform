var express = require("express")
var app = express()
var expressValidator = require("express-validator");
var expressSession = require("express-session");
var bodyparser = require('body-parser');
var users = require("./users");
var bcrypt = require('bcrypt');
var db = require("./database/db");
var ques = require("./database/models/question");
var questionReal = require("./database/models/questionSchema");
var usersSchema = require("./database/usersSchema");
// var user = require("./database/users")
var used = require("./views/arraytest");
const session = require("express-session");



app.set("view engine", "ejs")
app.use('/', express.static('./views/css/'));
app.use('/', express.static("./views/script/dashboard"));
const PORT =  process.env.PORT || 4000
var urlencodedparser = bodyparser.urlencoded({extended:false})
app.use(expressValidator())
app.use(expressSession({name: "smart", secret:"smart", saveUninitialized:false, resave: false}))

 

const subs = []

const correct = []
const unanswered = []
// we need session correct answers
// For securing the router when a session has not been initialized

function handleRedirectHome (req, res, next){
    if(req.session.name){
        next()
    }else{
        res.redirect('/')
    }
}


function handleRedirectSamePage (req, res, next){
   
    if(req.session.name){
        req.session.message = "You are here Already !"
        usersSchema.findOne({username:req.session.name}).then((result)=>{
            req.session.usermin = result.userMin
            req.session.usersec = result.userSec
            res.redirect('/questionpage')
        })
    }else{
        next();
    }
}
function ReloadSamePage (req, res, next){
    if(res.redirect("/questionpage") === true ){
        usersSchema.findOne({username:req.session.name}).then((result)=>{
            req.session.usermin = result.userMin
            req.session.usersec = result.userSec
            res.redirect('/questionpage')
    
        })
    }
}


app.get('/',handleRedirectSamePage, (req,res)=>{
     res.render("./index",{title:"Form Validation", success:req.session.success,errors: req.session.errors})
    req.session.errors = null
    req.session.success = null
   });

app.post('/', urlencodedparser, async(req,res)=>{
   
    try{
    const username = req.body.username
    const password = req.body.password
    usersSchema.findOne({username:username}).then((result)=>{
        
        // return (user.username === username && user.password === password)
    
    req.check("username","Username Not Registered").equals(result.username)
    req.check("password","Password Incorrect").equals( result.password)
    var errors = req.validationErrors()
    if(errors){
        req.session.errors = errors;
        res.redirect('/')
        req.session.success = false
    }else{
        req.session.success = true
        req.session.errors = false
        req.session.success = true;
        req.session.errors = null;
        req.session.name = username;
        req.session.usermin = result.userMin
        req.session.usersec = result.userSec
        req.session.correctoptions = []
        req.session.useroptions = []
        req.session.chosenoptions = []

        res.redirect('./dashboard');
    }
    
})
}catch(error){
    console.log( error )
}
   });
     
      app.get('/dashboard',urlencodedparser, (req,res)=>{
        
        res.render("./dashboard", {name:req.session.name})

      })

      app.post('/dashboard',urlencodedparser, (req,res)=>{
        subs.push(req.body)
        const usersubs = Object.keys(subs[0])
        req.session.subs = usersubs;
        res.redirect("/questionpage")
      });

      app.get('/questionpage', handleRedirectHome, (req,res)=>{
        questionReal.find().then((result)=>{
            res.render("./questionpage", {
                usersubs:req.session.subs,
                name:req.session.name, 
                datum: result, 
                min:req.session.usermin, 
                sec:req.session.usersec,
                message:req.session.message, 
                       
            })
            setInterval(timer, 1000)
            function timer() {
                return  req.session.usermin - 1
             }

             var msec = req.session.usersec
                var min = req.session.usermin

            function startTimer(){
                msec = msec - 1
                if(msec == 0){
                    msec = 59
                    min =  min - 1;
                }              
               usersSchema.findOneAndUpdate({username:req.session.name},{userMin:min, userSec:msec}).then(()=>{
                
               })
            }
            
         let interval =  setInterval(startTimer, 1000)

         
            
           
    })
      })
      
      const sessionanswers = []

      var sessionanswersmapped = null
      
      const correctoptions = []

      app.post('/questionpage', urlencodedparser, (req,res)=>{
       Object.values(req.body).map(ans=>{
            
       questionReal.find().then((result)=>{
              result.map(res=>{
                  res.data[0].Mathematics.map(maths=>{
                    //   console.log(maths.question_id)
                    //   console.log(maths.correct,2)
                    //   console.log(ans,1)
                    let score = 0
                                    if (maths.correct ==  ans) {
                                        console.log("true")
 
                                    }else if(maths.correct !== ans){
                                        console.log("false")
                                    }else{
                                        console.log("NaN")
                                    }
                                
                          
                             
                      
               })
            })

        })
           })
        })

    

app.listen(PORT)
console.log(`Server Now running on Port ${PORT}`)



/* 
 const  Questions = {
        English:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ],
         Mathematics:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ],
         Biology:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ],
         Chemistry:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ],
         Physics:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ],
         Crs:[
                 {questionId:2, question:"String", options:"Array", correct:"String"}
         ]
        }
         console.log(Questions)*/


























// app.post("/dash", urlencodedparser, async(req, res)=>{
//     try{
//     var email = (req.body.email)
//     var password = req.body.password
//     console.log(email)
//     console.log(password)
//    const findusers = users.find(user=>{
//       return user.email === email && user.password === password
//    })
//    console.log(email)
//    console.log(findusers)
//    if(findusers){
//      res.redirect("./dashboard")
//    console.log("USER AVAILABLE")
//    }else {
//        const errmsg = "INCORRECT INFORMATION"
//    }     
// }catch(error){
//     res.status(500).send()
//     console.log(error)
// }
// })