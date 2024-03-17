// require('dotenv').config({path: './env'});
// use to share .env file to all the files during the run
// for using import u have to go in jason->scripts and add "-r dotenv/config --experimental-json-modules"
import dotenv from "dotenv"
dotenv.config({path:"./env"});


import mongoose from "mongoose";

//importing the database name which we want to create from constant.js
import { DB_NAME } from "./constant.js";

//importing the mongodb connection constant variable
import connectDB from "./db/db_index.js";




connectDB();








/* 1 METHOD CONNECTION IN INDEX.JS => 2 METHOD IS USING DB FILE
import express  from "express";
const app = express();

//know as ifins
//use to connection of the database
;( async ()=>{
    try {
        
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        //for any express error (for prof approach)
        app.on("errror", (error)=>{
            console.log("ERR app unable to talk to database:",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port: ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("ERROR: ",error)
        throw err
    }
})()

*/