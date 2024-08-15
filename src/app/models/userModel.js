import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true
    },


    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "Please add an email"]
        
    },
    isVerified:{
        type: Boolean,
        default: false

    },
    isAdmin:{
        
    }


})