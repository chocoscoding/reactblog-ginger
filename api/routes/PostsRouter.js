const { Router } = require("express");
const multer = require("multer");
const { createPost, getAllPost, getPost,updatePost } = require("../controller/Posts");
const uploadMiddleware = multer({ dest: 'uploads/' });

const r = Router();

r.post("/", uploadMiddleware.single('file'), createPost);
r.post("/edit", uploadMiddleware.single('file'), updatePost);
r.get("/", getAllPost);
r.get("/:id", getPost);

module.exports = r;
