import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    number: {
        type: String,
    },
    verified: {
        type: String,
        required: true,
    },
    verificationToken: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);