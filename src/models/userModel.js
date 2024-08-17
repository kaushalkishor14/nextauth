import mongoose from "mongoose";

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
        type:Boolean,
        default: false
        
    },
    
    forgotPasswordToken: String,
    forgotPasswordTokenExpires: Date,
    verifyToken: String,
    verifyTokenExpires: Date


})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User