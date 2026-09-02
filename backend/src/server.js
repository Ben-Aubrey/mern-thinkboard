// const express = require("express");
import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import dns from 'dns'
import path from "path"

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dns.setServers(['1.1.1.1', '8.8.8.8'])
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


if (process.env.NODE_ENV !== "production") {
    // middleware
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json());  // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


// connect database and start app
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on PORT:', PORT);
    });
});
