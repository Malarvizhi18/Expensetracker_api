const express = require('express')
const bodyParser = require('body-parser')
const {connecttoDb,getDb} = require('./db.cjs')
// const {getDb} = require('./db.cjs')
const { request } = require('http')
const {ObjectId} = require('mongodb')
//app is backend application
//create new application
const app = express()
// __dirname access all the files in that directory for example nodejs2
app.use(express.static(__dirname))
let db
// body-parser convert body to an understadable form for nofe
app.use(bodyParser.json()) // node cannot read body directly,so body-parser change into a data
// connecting to the db
connecttoDb(function(error){
     // start the server
     if(!error){
     app.listen(8012)
     console.log("listening on 8012")
     db=getDb()
     // console.log(db)
}

     else{
          console.log(error)
     }
})

//POST METHOD
app.post('/add-entry',function(request,response){
     // console.log(request.body)
     db.collection('ExpenseData')
     .insertOne(request.body)
     .then(function(){
          response.status(201).json({//file created 201
               'status':'data successfully entered'
          })
     }).catch(function(error){
          response.status(500).json({
               'error':error
          })

     })
})
//      if(request.body.Expense!==null && request.body.Amount!==null && request.body.Date!==null )
//     { response.status(200).json({
//         "expense":"added successfully"
//      })}
   
//      else
//      {
//           response.status(404).json({
//                "expense" : "not added ,missing values"
//           })
//      }


// getting the data
app.get('/get-data',function(request,response){//find :return cursor-used to iterate
     const entries=[]
     db.collection('ExpenseData')
     .find()
     .forEach(entry=> entries.push(entry)) //save in etries array
     .then(function(entryData){
          response.status(200).json(entries)
     }).catch(function(error){
          response.status(404).json({
'error': error
          })
     })
})
//which particular address need to be listened
// Stating the server
// app.listen(8012)


//delete entriess

app.delete('/delete-entry', function(request, response) {
     // db.collection('').deleteOne({_id: new ObjectId()})
     if(ObjectId.isValid(request.body.id)){
         db.collection('ExpenseData').deleteOne({
             _id : new ObjectId(request.body.id)
         }).then(function() {
             response.status(201).json({
                 'status' : 'data successfully deleted'
             })
         }).catch(function(error) {
             response.status(500).json({
                 'error' : error
             })
         })
     } else {
         response.status(500).json({
             'status' : 'ObjectId not valid'
         })
     }
 })
 

 app.patch('/update-entry', function(request, response) {
     if(ObjectId.isValid(request.body.id)) {
         db.collection('ExpenseData').updateOne(
             {_id: new ObjectId(request.body.id)},
             {$set : request.body.data}
         ).then(function() {
             response.status(201).json({
                 'status' : 'data successfully updated'
             })
         }).catch(function(error) {
             response.status(500).json({
                 'error' : error
             })
         })
     } else {
         response.status(500).json({
             'status' : 'ObjectId not valid'
         })
     }
 })

