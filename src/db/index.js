//HERE IN THIS FILE THE CONNECTION OF MONGODB IS ESTABLISHED WITH ATLAS

import mongoose from "mongoose";

//importing the dbname
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // the connection of response is store here (CONNECTISTANCE VARIABLE)

        // console.log(connectInstance)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
//Importing this in the index file (This is method 2 approach for connection establishment)