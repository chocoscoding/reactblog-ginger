const UserModel = require("../model/UserSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "e061ee9a39d23c76f068782df06ef0e2";
const createUser = async (req, res) => {

    const { username, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    const hasedPassword = bcrypt.hashSync(password, salt);
    try {
        const user = await UserModel.create({ username, password: hasedPassword });
        return res.status(200).json({ username: user.username, id: user._id });
    } catch (e) {
        return res.status(400).json(e.message);
    }
};

const loginUser = async (req, res) => {

    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (comparePassword) {
            // login user
            return jwt.sign({
                username, id: user._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                return res.status(200).cookie('token', token).json({ username: user.username, id: user._id });
            });
        }
        return res.status(401).json('wrong credentials');
    } catch (e) {
        return res.status(400).json(e.message);
    }
};

const profile = async (req, res) => {
    try {
        const { token } = req.cookies;
        return jwt.verify(token, jwtSecret, {}, (err, info) => {
            if (err) throw err;
            res.status(200).json(info);
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const logout = async (req, res) => {
    res.cookie('token', '').json('ok');
};





module.exports = {
    createUser,
    loginUser,
    profile,
    logout
};