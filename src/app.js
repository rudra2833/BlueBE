//here in we use to have lesser things in index.js 
//we use to store and import every thing in this file

//THIS FILE IS USED FOR EXPRESS USE
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


//implementation of cors USED TO SECURITY IN FRONTEND AND BACKEND SERVERS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//for json transaction support in the website
app.use(express.json({limit: "16kb"}))

//we have use in our previous course projects
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//dont know about this?
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'


//routes declarations
// here we use app.use acts as a middleware
// app.use("/user", userRouter)
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }