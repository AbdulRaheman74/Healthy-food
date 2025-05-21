import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import userRoutes from "./routes/useRoutes.js";


const app=express();
app.use(express.json())
dotenv.config();

app.use(cors());
const port=process.env.PORT;
const dbUrl=process.env.DBURL;
const dbName=process.env.DBNAME;


app.use("/product",productRoutes);
app.use("/user",userRoutes);


connectDB(dbUrl,dbName)

app.listen(port,()=>{
    console.log(`server listing on port no ${port}`);
    
})