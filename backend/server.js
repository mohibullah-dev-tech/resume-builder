require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path= require("path");

const app = express();

// middle ware to handle cors

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization",]
    })
);

// MiddleWare
app.use(express.json());

// Start Server

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server running on port  ${PORT}'));


