const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path= require("path");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const app = express();

// middle ware to handle cors

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization",]
    })
);

//Connect to DB
connectDB();
// MiddleWare
app.use(express.json());

// Routes
app.use("/api/auth",authRoutes);
// app.use("/api/resume",resumeRoutes);

//static files
app.use(express.static(path.join(__dirname,"public")));

// Start Server

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port  ${PORT}`));


