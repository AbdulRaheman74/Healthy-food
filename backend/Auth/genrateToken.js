import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ user: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "2d",
  });
};

export default generateToken;
