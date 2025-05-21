import express from "express";
import { productCreatecontroller,getallproductsCreatecontroller ,getoneproductsCreatecontroller} from "../controller/productController.js";



const productRoutes=express.Router();


productRoutes.post("/createproduct",productCreatecontroller);
productRoutes.get("/getallproducts",getallproductsCreatecontroller);
productRoutes.get("/getone/:id",getoneproductsCreatecontroller);




export default productRoutes;