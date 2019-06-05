const multer = require("multer");

const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Invalid mime type")
        if(isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

module.exports = multer({storage: storage}).single("image");