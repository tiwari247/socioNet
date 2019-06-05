const router = require("express").Router();
const auth = require("../middleware/auth");
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/posts");
const multerMiddleware = require("../middleware/store-image-multer");

//getAllPosts
router.get("/", getPosts);
router.post("/", auth, multerMiddleware, createPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, multerMiddleware, updatePost);

module.exports = router;