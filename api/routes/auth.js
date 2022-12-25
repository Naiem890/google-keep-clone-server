const { sign } = require("jsonwebtoken");
const { signupValidation } = require("../../validation/authValidation");
const { login, logout, signup } = require("../controllers/auth");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.post("/signup", signupValidation, signup);
authRouter.delete("/logout", logout);

module.exports = authRouter;
