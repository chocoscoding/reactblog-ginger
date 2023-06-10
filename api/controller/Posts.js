const Post = require("../model/PostSchema");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwtSecret = "e061ee9a39d23c76f068782df06ef0e2";
const createPost = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        const { token } = req.cookies;
        return jwt.verify(token, jwtSecret, {}, async (err, info) => {
            if (err) throw err;
            const { title, summary, content } = req.body;
            const newPost = await Post.create({
                title, summary, content, cover: newPath, author: info.id
            });
            return res.status(200).json(newPost);

        });
    } catch (e) {
        return res.status(400).json(e.message);
    }
};

const getAllPost = async (req, res) => {
    try {

        return res.status(200).json(await Post.find().populate('author', "username").sort({ createdAt: -1 }).limit(20));
    } catch (e) {
        return res.status(400).json(e.message);
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', "username");
        return res.status(200).json(post);
    } catch (e) {
        return res.status(400).json(e.message);
    }
};


const updatePost = async (req, res) => {
    let newPath = false;
    try {
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }

        const { token } = req.cookies;
        return jwt.verify(token, jwtSecret, {}, async (err, info) => {
            if (err) throw err;
            const { id, title, summary, content } = req.body;
            const newPost = await Post.updateOne({ author: info.id, _id: id }, {
                title, summary, content, ...(newPath && { cover: newPath })
            });
            return res.status(200).json(newPost);

        });

    } catch (e) {
        return res.status(400).json(e.message);
    }
};



module.exports = {
    createPost,
    getAllPost,
    getPost, updatePost
};