const { Router } = require("express");
const { loginUser, createUser, profile, logout } = require("../controller/Users");

const r = Router();

r.post("/login", loginUser);
r.post("/signup", createUser);
r.get("/profile", profile);
r.post("/logout", logout);

module.exports = r;
