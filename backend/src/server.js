// const express = require("express");
import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import dns from 'dns'

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dns.setServers(['1.1.1.1', '8.8.8.8'])
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());  // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

// connect database and start app
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on PORT:', PORT);
    });
});
