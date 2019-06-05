const {Post} = require("../models/Post");

module.exports.getPosts = async(req, res)=>{
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
};

module.exports.createPost = async(req, res)=>{
    const userId = req.user.id;
    // console.log("Inside POST: "+);
    let url = req.protocol + "://" + req.get("host");

    let post = new Post({
        title: req.body.title,
        description: req.body.description,
        imgPath: url + "/images/" + req.file.filename,
        creater: userId
    });
    try{
        await post.save();
        res.send({
            message: "Post Created!",
            post: post
        });
    }catch(err){
        res.status(500).send({
            message: "Something went wrong!",
            error: err.message
        });
    }
};

module.exports.deletePost = async(req, res)=>{
    const userId = req.user.id;
    console.log(userId);
    let id = req.params.id;
    try{
        post = await Post.findOneAndDelete({_id:id, creater:userId});
        console.log(post);
        if(post){
            res.send({
                message: "Deleted Post!",
                post: post
            });
        }else{
            res.status(401).send({
                message: "Not Authorized",
                error: "Not Authorized"
            });
        }
        
    }catch(err){
        res.status(500).send({
            message: "Something went wrong!",
            error: err.message
        });
        // console.log(err.message);
    }
};

module.exports.updatePost = async(req, res)=>{
    const userId = req.user.id;
    console.log(userId); 
    let imgPath = req.body.imgPath;
    let url = req.protocol + "://" + req.get("host");
    let id = req.params.id;
    
    if(req.file){
        imgPath = url + "/images/" + req.file.filename;
    }  

    let upPost = {
        title: req.body.title,
        description: req.body.description,
        imgPath: imgPath,
        creater: req.body.creater
    }; 
    // console.log(upPost);
    try{
        const post = await Post.findOneAndUpdate({_id:id, creater:userId}, upPost, {new:true});
        console.log(post);
        if(post){
            res.send({
                message: "Updated Post",
                post: post
            });
        }else{
            res.status(401).send({
                message: "Not Authorized",
                error: "Not Authorized"
            });
        }
    }catch(err){
        res.status(500).send({
            message: "Something went wrong!",
            error: err.message
        });
    }  
};