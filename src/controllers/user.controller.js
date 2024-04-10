import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
    // res.status(500).json({
    //     message: "chai aur code"
    // })

    //get details from front end
    //check validation for the entries-no empty
    //checking user is already registered
    //check for images and avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token from the response
    //checl for user creation
    //response return else send error

    //
    const {fullname, email, username, password} = req.body
    console.log(fullname)

    //
    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "Fullname cannot be empty");
    }

    //to call mongoDB
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    //handling images and avatars
    //here we require the first object only which consist the path 
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImagePath = req.file?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    //uploading images to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //entry in database
    const User = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || null,
        email,
        password,
        username: username.toLowerCase()
    })

    //use to check the user is created or not
    //also select the fields which are not required
    const usercheck = await User.findbyId(User._id).select(
        "-password -refreshToken"
    )

    if(!usercheck){
        throw new ApiError(500,"Something when wrong-> User not created")
    }

    //response to the front end
    return res.status(201).json(
        new ApiResponse(201, usercheck, "User created successfully")
    )

} )


export {
    registerUser,
}