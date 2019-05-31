const router = require("express").Router();
const {Post} = require("../models/Post");

router.get("/", async(req, res)=>{
    console.log("get called()");
    try{
        const posts = await Post.find();
        res.send({
            message: "Posts Fetched!",
            posts: posts
        });
    }catch(err){
        res.send(err.message);
    } 
});

router.post("/", async(req, res)=>{
    
    let post = new Post({
        title: req.body.title,
        description: req.body.description
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

router.delete("/:id", async(req, res)=>{
    
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

router.put("/:id", async(req, res)=>{
    let id = req.params.id;
    let upPost = {
        title: req.body.title,
        description: req.body.description
    }; 
    try{
        const post = await Post.findByIdAndUpdate(id, upPost);
        res.send({
            message: "Updated Post",
            post: post
        });
    }catch(err){
        res.send(err.message);
    }  
});

module.exports = router;