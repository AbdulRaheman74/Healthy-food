import { ProductModel } from "../model/productModel.js";

export const productCreatecontroller = async (req, res) => {
    try {
        const {
            name, image, price, description, category, stock, rating,
            reviews, nutritionalInfo, ingredients, preparationTime,
            shelfLife, storageInstructions
        } = req.body;

        // Check if all required fields are provided
        if (!name || !image || !price || !description || !category || !stock ||
            !preparationTime || !shelfLife || !storageInstructions) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const product = new ProductModel({
            name, image, price, description, category, stock, rating,
            reviews, nutritionalInfo, ingredients, preparationTime,
            shelfLife, storageInstructions
        });

        await product.save();
        return res.status(201).json({ success: true, product });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const getallproductsCreatecontroller=async(req,res)=>{
    try {
        const product=await ProductModel.find();

        return res.status(200).json({success:true,product:product})
        
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
        
    }
}



export const getoneproductsCreatecontroller = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the product and convert it to a plain JS object
        const product = await ProductModel.findById(id).lean(); 

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// export const productloginController=(req,res)=>{
//     try {
//         const {email,password}=req.body;
//     } catch (error) {
        
//     }
// }