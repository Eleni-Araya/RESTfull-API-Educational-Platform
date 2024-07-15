import { Schema, InferSchemaType, model } from "mongoose";



export const GUEST_PICTURE = {
    originalname: "guest.png",
    mimetype: "image/png",
    path: "images/guest.png",
    size: 150
};
const UserSchema = new Schema({
    fullname: { first: String, last: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    picture: {
        type: {
            originalname: String,
            mimetype: String,
            path: String,
            size: Number
        }, default: GUEST_PICTURE
    }
}, { timestamps: true, versionKey: false });

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel = model<User>('user', UserSchema);