import mongoose, {Schema} from "mongoose";

import jwt from "jsonwebtoken"
//helps to encrypt the password before sending it to the mongoDB
import bcrypt from "bcrypt"


//creation of user model as pre u
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)


//i means just before saving the data in the database use this function
// here it is used to encrypt the passwords
// this function is written in the  models files as we have to use in 
// between when we send the data in the database
// acts as a middleware HOOKS
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    //encrypts the password before save is clicked  
    this.password = bcrypt.hash(this.password, 10)
    next()
})


//same as we have created the middleware
// in mongoos we can create custom methods
// by using below way
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


//generates the access token JWT TOKENS
//returns jwt access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        //private key for the encodeing 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



//generates the refresh token JWT TOKENS
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)