// import mongoose from "mongoose";
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: [String], // Array of image URLs
//     required: true
//   },
 
//   price: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
   
//   }
  
 
// });




// export const ProductModel=new mongoose.model("product",productSchema)




import mongoose from "mongoose";

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

// Nutritional Information Schema
const nutritionalInfoSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
});

// Main Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // Array of image URLs
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  nutritionalInfo: nutritionalInfoSchema,
  ingredients: {
    type: [String],
    required: true,
  },
  preparationTime: {
    type: Number,
    required: true,
  },
  shelfLife: {
    type: String,
    required: true,
  },
  storageInstructions: {
    type: String,
    required: true,
  },

});


export const ProductModel = mongoose.model("Product", productSchema);