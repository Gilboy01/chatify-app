//create a basic API
// const express = require('express');
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js"; 
import {ENV} from "./lib/env.js";
import { app, server } from "./lib/socket.js";

// const app = express(); we implement socket no longer useful
const __dirname = path.resolve();

//  console.log(process.env.PORT);
// incase port is not defined, 3000 is the fallback value
const port = ENV.PORT || 3000;


app.use(express.json({limit: "5mb"})); //(req.body) middleware for backend to communicate with frontend and must always be above routes
app.use(cors({origin:ENV.CLIENT_URL, credentials:true})); //allow frontend to send cookies to backend
app.use(cookieParser()); //allows us use cookies

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // any other routes other than those above
    app.get("*", (req,res) =>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}



server.listen(port, () => {
    console.log(`server running on port ${port}`);
    connectDB(); // to connect to db

});
