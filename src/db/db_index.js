import mongoose from "mongoose";

//HERE IN THIS FILE THE CONNECTION OF MONGODB IS ESTABLISHED WITH ATLAS

//importing the dbname
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {

        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected!! DB HOST: ${connectInstance.connection.host}`)

    } catch (error) {
        console.log("MongoDB connection ERROR: ",error);
        process.exit(1)
    }
}

export default connectDB