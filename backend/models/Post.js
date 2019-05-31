const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;