//THIS FILE IS USED FOR EXPRESS USE
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

//implementation of cors USED TO SECURITY IN FRONTEND AND BACKEND SERVERS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

//for json transaction support in the website
app.use(express.json({limit: "16KB"}));

//we have use in our previous course projects
app.use(express.urlencoded({ extended:"true", limit: "16KB"}))


app.use(express.static("public"))

//dont know about this?
app.use(cookieParser)


export { app }