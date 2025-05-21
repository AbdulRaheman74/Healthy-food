import generateToken from "../Auth/genrateToken.js";
import { userModel } from "../model/userMode.js";
import bcrypt from "bcrypt";

export const createUserController = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password } = req.body;

    if (!fullname || !email || !phonenumber || !password ) {
      res
        .status(400)
        .json({ success: false, message: "All feilds Are Rqueire" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel({
      fullname,
      email,
      phonenumber,
      password: hashpassword,
      
    });

    user.save();
    return res
      .status(200)
      .json({ message: "user create successfully", success: true, user: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    const ismatch = await bcrypt.compare(password, user.password);

    const token = generateToken(user);

    if (ismatch) {
      return res.status(200).json({
        success: true,
        message: "Login Sccussfylly",
        user: user,
        token: token,
      });
    }

    console.log(user.password);
    return res.status(404).json({ success: false, message: "Login failed" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { user } = req.user;
    const data = await userModel.findById(user).select("-password");
    res.status(200).json({ success: true, user: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from URL
    const { fullname, email, phonenumber, address } = req.body; // Destructure fields explicitly

    console.log('User ID:', userId); // Log the user ID
    console.log('Incoming request body:', req.body); // Log the request body

    // Validate input: Ensure at least one valid field is provided
    if (
      !fullname &&
      !email &&
      !phonenumber &&
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: 'At least one valid field is required for update',
      });
    }

    // Validate phone number format (optional, but recommended)
    if (phonenumber && !/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits',
      });
    }

    // Prepare the update object with only the provided fields
    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (phonenumber) updateFields.phonenumber = phonenumber;
    if (address) updateFields.address = address;

    // Find the user by ID and update their information
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateFields, // Only update the fields that were provided
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Return success response with the updated user data
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Handle specific errors (e.g., validation errors)
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.message,
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};