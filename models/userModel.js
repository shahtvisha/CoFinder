const mongoose=require('mongoose')
const Schema = mongoose.Schema;
let userSchema = new Schema({
    name:String,
    username:String,
    password:String


}, {timestamps: true})
const productModel = mongoose.model('users', userSchema)
module.exports=productModel
