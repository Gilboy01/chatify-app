//create a basic API
// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'


const app = express();
dotenv.config();

// console.log(process.env.PORT);
// incase port is not defined, 3000 is the fallback value
const port = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


app.listen(port, () => console.log(`server running on port ${port}`));
