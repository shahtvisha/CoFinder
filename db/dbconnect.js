const mongoose = require('mongoose');

async function dbConnect(){
    return mongoose.connect('mongodb://localhost:27017/projectDetails');
}
var conn = dbConnect();
//console.log(conn)
console.log('DB connected')

conn.then((results)=>console.log()).catch((err)=>console.log(err))