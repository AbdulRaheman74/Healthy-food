import express from "express";
import { createUserController,loginUser,getOneUser,updateUserController } from "../controller/useController.js";
import varifyToken from "../Auth/varifyToken.js";


const userRoutes=express.Router();


userRoutes.post("/createUser",createUserController)
userRoutes.post("/loginUser",loginUser)
userRoutes.get("/getOneUser",varifyToken,getOneUser)
userRoutes.put("/updateUser/:id",updateUserController)



export default userRoutes;