import mongoose from "mongoose";
import 'dotenv/config';

export function connectToDatabase() {

    mongoose.connect('mongodb://127.0.0.1:27017/Final_project')
        .then(_ => console.log("Connected Successfully to database"))
        .catch(console.log);

}

console.log();