//temporary basis mongoose in controller, later on special middleware to handle mongoose 
const mongoose = require('mongoose');
var projectModel= require('../models/projectModel');
var userModel=require('../models/userModel');
var nodemailer = require('nodemailer');
const fupload =require("../middleware/multer");
const dashboardFunction = (req,res) => {
    res.render("dashboardOptions")
}

const projectLandingFunction=(req,res)=>{
    res.render("projectLanding")
}
const signUpFunction=(req,res)=>{
    res.render("signUp")
}

const signUpSubmitFunction=(req,res)=>{
    console.log(req.body)
    const inputS = new userModel({"name": req.body.name,
    "username": req.body.email,
    "password":req.body.password

});
const mailemail=req.body.email

inputS.save(function(errInsert){
    if(!errInsert){
        //res.send({msg:"Record Added"})
        res.render('signUpAdded', {mailId: mailemail} )
    }
    else{
        console.log(errInsert)
    }
})

}



const projectDetailsFunction =(req, res) => {
    res.render("projectDetails")
}
const projectFunction=(req,res) =>{
    console.log(req.body)
    //console.log("function works")
    //res.send({msg:'Information sucessfully added'})
    //add validation for data!
    //use var inputData= req.body;
    var upload = fupload.doFileUpload(
        "./assests/products/productIMG",
        Date.now(), 
        "picpath"
    );
    upload(req,res,function(err){
        if(err){
            console.log(err);
        }else{
            console.log(req.file)
            const inputD = new projectModel({"projectId":req.body.pID,
        "projectName": req.body.projectname,
        "projectDesc": req.body.projectdesc,
        "projectDomain": req.body.projectdom,
        "projectDeadline": req.body.projectDeadline,
        "projectHeadName":req.body.phname,
        "projectHeadEmail":req.body.phemail,
        "imgFileName":req.file.filename
        
        
    });
    
    inputD.save(function(errInsert){
        if(!errInsert){
            //res.send({msg:"Record Added"})
            res.render('recordAdded.ejs')
        }
        else{
            console.log(errInsert)
        }
    })
    
            
        }
    })
     //not able to extract the value

    
    
    
}

const fileDownloadFunction =(req,res)=>{
    const imgName=req.params.id
   console.log(imgName)
   res.render("fileshow", {imgPath:imgName})


}

const findProjectFunction=(req,res) =>{
    projectModel.find({}, function(err,docs){
        if(!err){
            //console.log('Data:')
            //console.log(docs)
            res.render("projectfind",  {data:docs}) //won't render?!
            // need to create another place to store docs because the pointer changes 
        }
    });

    
}

const addToCartFunction = (req,res) =>{
        var idDetails=$(this).attr("for");
        console.log(idDetails)
        console.log("TEST")

}

const checkOutFunction =(req, res) => {
    res.render("checkOutPage.ejs")
}

const cartActionFunction = (req, res ) =>{
    //console.log(req.body)
    //res.send({msg:"Route called for add to cart"})
    var productIdForCart = req.body.productid;
    
    //console.log(req.cookies.dataFromCookies)
    // return 
    // var dataFromCookies = req.cookies.dataFromCookies;
    // values is undefined 
    
    const cookieTime = (24*60*60*1000)*30;
    console.log(req.cookies.dataFromCookies)
    if(req.cookies.dataFromCookies === undefined){
        // 1 st product
        res.cookie(
            'dataFromCookies',
            productIdForCart,
            {maxAge: cookieTime}
        ).send({msg:"Product Added In Cart"});
    }
    else{
        // all cookies info in allDataFromCookies
        var allDataFromCookies = req.cookies.dataFromCookies;

        var recordTobeAdded = productIdForCart;
        console.log(recordTobeAdded);
    
        var arr = allDataFromCookies.split(",");
        console.log(arr); 
        

        var checkproduct = arr.indexOf(recordTobeAdded);
        console.log(checkproduct);  // -1 means doesnt exist
        

        if(checkproduct == -1){
            var newrecord = allDataFromCookies+","+recordTobeAdded;
            console.log(newrecord);

            res.cookie(
                'dataFromCookies',
                newrecord,
                {maxAge: cookieTime})
            .send({msg:"Product Updated In Cart"});
        }
        else{
            res.send({msg : 'product Exist in Cart'});
        }
    }

}

const cartFunction = (req,res) =>{
    var dataFromcookies = req.cookies.dataFromCookies;
    // console.log(dataFromcookies);

    if(dataFromcookies === undefined){
        res.render("InterestedPPage" , {msg : 'Cart Empty',result:[]});
    }
    else{
        // console.log(dataFromcookies); // 10,20,30
        var arr= dataFromcookies.split(",");
        // console.log(arr); // [10,20,30]
        //db.inventory.find( { quantity: { $in: [ 5, 15 ] } }, { _id: 0 } )
        projectModel.find({_id:{$in:arr}} , function(err,docs){
            if(!err){
                 console.log(docs);
                res.render("InterestedPPage" , {msg :false , result:docs});
            }
        })
        
    }
}

const DeleteCartFunction = (res, req) => {
    var proidTobeDeleted = req.body.proValue;
    var dataFromCookies = req.cookies.dataFromCookies;
    var arr = dataFromCookies.split(",");

    if(arr.length == 1){
        res.clearCookie('dataFromCookies').send({msg :"Cart Empty"});
    }
    else{
        var indexNo = arr.indexOf(proidTobeDeleted);
       
        arr.splice(indexNo,1)
        var finalData = arr.join(",");
  
        cookieTime = 24*60*60*1000;
        res.cookie(
            'dataFromCookies',
            finalData,
            {maxAge: cookieTime}
        ).send({msg:"Product Deleted From Cart"});
    }
}

const filterFunction= (req,res) =>{
    //console.log(req.body.projectDomain);
    var value = req.body.projectDomain;
    console.log(value)
    projectModel.find({"projectDomain":value},function(err,docs){
        if(!err){
            //console.log(docs)
            res.send({msg:docs});
        }
    })
}

const updatepageFunction=(req,res)=>{
    res.render('updateProject')
}

const updateActionFunction=(req,res)=>{
    console.log(req.body)
    var myquery = { projectID: req.body.upID}
    var values={projectName:req.body.uprojectname, projectHeadName:req.body.uphname, projectHeadEmail:req.body.uphemail, projectdesc:req.body.uprojectdesc, projectDomain:req.body.updom, projectDeadline:req.body.upprojectDeadline,imgFileName:req.body.picpath }
    projectModel.updateOne(myquery,values, function(err,docs){
        if(!err){
            res.render('postUpdate')
            //console.log(docs)
             //won't render?!
            // need to create another place to store docs because the pointer changes 
        }
    });
}

const mailDetailsFunction=(req,res)=>{
    let pHmail=req.params.id
    var usermail;
    userModel.find({}).sort({ createdAt: 'asc'}).limit(1).then((err,data)=>{
        if(!err){
            usermail=data
        }
    });
    console.log(pHmail)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cofinderproject@gmail.com',
          pass: 'cofinder2022'
        }
      });
      
      var mailOptions = {
        from: 'cofinderproject@gmail.com',
        to: pHmail,
        subject: 'Invitation to connect',
        text: `I would like to work on your project, reach out on ${usermail}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
      console.log("function called")

}




 module.exports={
    dashboardFunction,
    projectDetailsFunction,
    projectFunction,
    findProjectFunction,
    checkOutFunction,
    addToCartFunction,
    cartActionFunction,
    cartFunction,
    DeleteCartFunction,
    filterFunction,
    mailDetailsFunction,
    signUpFunction,
    signUpSubmitFunction,
    updatepageFunction,
    updateActionFunction,
    projectLandingFunction,
    fileDownloadFunction
    

 }