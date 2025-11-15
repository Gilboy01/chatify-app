//create a basic API
// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path";
import { connectDB } from "./lib/db.js"; 

const app = express();
dotenv.config();

const __dirname = path.resolve();

//  console.log(process.env.PORT);
// incase port is not defined, 3000 is the fallback value
const port = process.env.PORT || 3000;

// routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

// any other routes other than those above
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

//for backend to communicate
app.use(express.json()); // req.body

app.listen(port, () => {
    console.log(`server running on port ${port}`)
    connectDB(); // to connect to db

});
