const router = require("express").Router();
const {Post} = require("../models/Post");
const multer = require("multer");
const auth = require("../middleware/auth");

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

router.get("/", async(req, res)=>{
    const resultsPerPage = +req.query.resultsPerPage;
    const page = +req.query.page;
    const postQuery = Post.find();
    let allPosts;

    if(page && resultsPerPage){
        postQuery
            .skip(resultsPerPage * (page - 1 ))
            .limit(resultsPerPage);
    }

    postQuery.then((posts)=>{
        allPosts = posts; 
        return Post.count();
    }).then((count)=>{
        res.send({
            message: "Posts Fetched!",
            posts: allPosts,
            maxPosts: count
        });
    });
});


router.post("",)
router.post("/", auth, multer({storage: storage}).single("image") ,async(req, res)=>{
    
    let url = req.protocol + "://" + req.get("host");

    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        imgPath: url + "/images/" + req.file.filename,
        creater: req.body.userId
    });
    try{
        await post.save();
        res.send({
            message: "Post Created!",
            post: post
        });
    }catch(err){
        res.send(err.message);
    }
});

router.delete("/:id", auth, async(req, res)=>{
    
    let id = req.params.id;
    console.log(id);
    try{
        post = await Post.findByIdAndDelete(id);
        res.send({
            message: "Deleted Post!",
            post: post
        });
    }catch(err){
        res.send(err.message);
        // console.log(err.message);
    }
});


router.put("/:id", auth, multer({storage: storage}).single("image"), async(req, res)=>{
    
    let imgPath = req.body.imgPath;
    let url = req.protocol + "://" + req.get("host");
    let id = req.params.id;
    
    if(req.file){
        imgPath = url + "/images/" + req.file.filename;
    }
    

    let upPost = {
        title: req.body.title,
        description: req.body.description,
        imgPath: imgPath
    }; 
    // console.log(upPost);
    try{
        const post = await Post.findByIdAndUpdate(id, upPost, {new:true});
        console.log(post);
        res.send({
            message: "Updated Post",
            post: post
        });
    }catch(err){
        res.send(err.message);
    }  
});

module.exports = router;