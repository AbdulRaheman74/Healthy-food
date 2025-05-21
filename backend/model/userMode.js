import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    fullname:{type:String ,require:true},
    email:{type:String ,require:true},
    phonenumber:{type:Number ,require:true},
    password:{type:String ,require:true},
    address:{type:String ,require:true},
   
});


export const userModel=new mongoose.model("userCollection",userSchema)