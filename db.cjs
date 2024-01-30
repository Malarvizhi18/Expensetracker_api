const {MongoClient} = require('mongodb')
let db
function connecttoDb(startServer){ //start server is call back func
     MongoClient.connect('mongodb+srv://malar:malar1234@cluster0.v20ledk.mongodb.net/Expensetracker?retryWrites=true&w=majority').then(function(client){  //.then return client
        db=client.db()//we can access database using client.db()
        /*sometimes client.db() throw an error when db is not connected properly **/
        return startServer()
        // console.log(db)
     }).catch(function(error){
        return startServer(error)
     }) 
     
     //connect to data base,database url will be here , link from mongo db compass
    // include /database_name with that link ,instead of localhost put 127.0.0.1-> for app crahed
    
}
function getDb(){
    return db
}
module.exports = {connecttoDb,getDb}