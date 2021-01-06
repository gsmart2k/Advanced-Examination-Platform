questionReal.find().then((result)=>{
  result.map(res=>{
      res.data[0].Mathematics.map(maths=>{
          req.session.correctoptions.push(maths.correct)
          
      })
      
  })
 

          var trues = []
          req.session.useroptions.map(useranswers=>{
              // console.log(correctoptions)
              const answersassigned = Object.values(useranswers)
              if(req.session.correctoptions.length != answersassigned.length){
                  // console.log("equal true")
              }else{
                  for(var i = 0; i<req.session.correctoptions.length; i++){
                      if(req.session.correctoptions[i] == answersassigned[i]){
                          console.log("true")
                          trues.push("true")
                         
                      }else{
                          console.log("false")
                      }
                     
                   }
                  console.log(trues.length)
              }
          })
          //  console.log(correctoptions.length)
          //  console.log(sessionanswersmapped.length)

          
          
      })