const multer = require("multer")
const path = require("path")

 const upload = multer({

     storage: multer.diskStorage({}),
    
    filename:(req, file, cb) =>{
        cb(null, new Date().toISOString() + file.originalname);
    },
    
    fileFilter: (req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !=='.jpeg'&& ext !=='.jpg' && ext !== '.png'){
        cb(new Error('unsupported format'),false)
        return
        }
    cb(null, true)
    }
});

module.exports = upload
