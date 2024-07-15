import express from "express";
import { parseBody } from "../parser";
import { signIn, signUp } from "../Controllers/userController";
import { verifyFunction } from "../VerifyToken/token";

export const user_Route = express.Router();


user_Route.post('/signup', parseBody(), signUp);
user_Route.post('/signin', parseBody(), verifyFunction, signIn);

export default user_Route;