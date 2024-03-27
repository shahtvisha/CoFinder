const mongoose=require('mongoose')
const Schema = mongoose.Schema;
let projectSchema = new Schema({
    projectId:Number,
    projectName:String,
    projectDesc:String,
    projectDomain:String,
    projectDeadline:Date,
    projectHeadName:String,
    projectHeadEmail:String,
    imgFileName:String  


})
const productModel = mongoose.model('project', projectSchema)
module.exports=productModel
