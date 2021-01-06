const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/questions',{useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.once('open',()=>{
    console.log("connection to db succesuful, proceed !")
}).on('error',(error)=>{
    console.log(`error here + ${error} `)
});
