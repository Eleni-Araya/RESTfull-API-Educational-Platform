import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { StandardResponse } from "../standardResponse";
import { User } from "../Usermodels/userSchema";

export const verifyFunction: RequestHandler<unknown, StandardResponse<User>, unknown, unknown> = async (req, res, next) => {
    try {
        const secret_key = process.env.SECRET_KEY;
        if (secret_key) {
            const token = req.headers.authorization?.split(" ")[1];
            const results = verify(token!, secret_key);
            // req.userInfo = results;
            // console.log(results);
            next();
        } else {
            throw new Error("Key do not match");
        }
    } catch (error) {
        throw new Error("You are not authorized");
    }

};