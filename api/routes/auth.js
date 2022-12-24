const { sign } = require("jsonwebtoken");
const { login, logout, signup } = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.delete("/logout", logout);

module.exports = authRouter;
