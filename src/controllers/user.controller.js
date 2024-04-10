import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req, res) => {
    res.status(500).json({
        message: "chai aur code"
    })

    //get details from front end
    //check validation for the entries-no empty
    //checking user is already registered
    //check for images and avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove password and refresh token from the response
    //checl for user creation
    //response return else send error

    // const {fullname, email, username, password} = req.body
    // console.log(fullname)

} )


export {
    registerUser,
}