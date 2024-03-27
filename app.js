
const express= require('express'); 
const cookieParser = require('cookie-parser') 
const commonR=require("./routes/commonRoute");
const db= require("./db/dbConnect");
const app= express();
app.use(cookieParser()); // cookies before routes!
const bodyParser= require('body-parser')
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set("view engine","ejs")
app.use("/",commonR);
app.use('/public', express.static('assests')) // accessing assess folder



app.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log("APP RUNNING")
});