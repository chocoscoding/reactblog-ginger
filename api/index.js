const express = require('express');
const cors = require('cors');
const app = express();
const UserRouter = require('./routes/UserRouter');
const PostsRouter = require('./routes/PostsRouter');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cookies = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookies());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use("/", UserRouter);
app.use("/posts", PostsRouter);

const start = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log(`Running on http://localhost:${PORT} ⚡`));
    } catch (error) {
        console.log(error);
    }
};

start();


