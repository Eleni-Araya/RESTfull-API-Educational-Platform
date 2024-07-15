import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";

import { compare, hash } from 'bcrypt';
import { generate } from "randomstring";


import { StandardResponse } from "../standardResponse";
import { User } from "../Usermodels/userSchema";
import { UserModel } from "../Usermodels/userSchema";
import { emit } from "process";




export const signUp: RequestHandler<unknown, StandardResponse<User>, User, unknown> = async (req, res, next) => {
    try {
        const hashedPassword = await hash(req.body.password, 10);
        const { fullname, email, active, picture } = req.body;
        const newUser = await UserModel.create(
            { "fullname": fullname, "email": email, "password": hashedPassword, "active": active, "picture": picture }
        );
        res.json({ success: true, data: newUser });
    } catch (error) {
        console.log(error);
    }
};

export const signIn: RequestHandler<unknown, StandardResponse<string>, User, unknown> = async (req, res, next) => {
    try {

        const { password, email } = req.body;
        let userData = await UserModel.findOne({ email });
        if (userData) {
            const verifyPassword = await compare(password, userData.password);

            const secret_key = "this_is_secrete_key";
            if (verifyPassword) {
                const { _id, fullname, picture } = userData;
                const jwt = sign({ _id: _id, fullname: fullname, picture: picture.path }, secret_key);
                res.json({ success: true, data: jwt });
            }
        } else {
            throw new Error("Fail to generate a token");
        }
    } catch (error) {
        console.log(error);
    }
};



