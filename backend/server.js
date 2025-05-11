import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config' // to use env variables
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config- initialize our app using express package
// const express = require('express');
const app = express()
const port = process.env.PORT || 4000;
// const port =4000;


// middleware
app.use(express.json()); //json is a middleware used to pass request from FE to BE
app.use(cors()); //using this we can access backend from any frontend

// db connection
connectDB();

// create api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
console.log(`Server Started on http://localhost:${port}`)
})
// username - sangeethavaddepalli17
// pass-KSoieklB0eQSHzO7

