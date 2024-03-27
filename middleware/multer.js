const multer = require('multer')
const upload = multer().single('picpath')

const doFileUpload = (dest,uniqueValue,filedata)=>{
    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, dest)
        },
        filename: function (req, file, cb) {
          cb(null, uniqueValue+file.originalname)
        }
      })
      
    ////<input type="file" name="productImagePath" />  
    const upload = multer({ storage: storage }).single('picpath')
    return upload;
}

module.exports =  {
    doFileUpload
}
