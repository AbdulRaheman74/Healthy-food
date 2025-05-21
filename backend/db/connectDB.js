import mongoose from "mongoose";


const connectDB=(dbUlr,dbName)=>{
    mongoose.connect(dbUlr+dbName);

    console.log("connected")


}

export default connectDB