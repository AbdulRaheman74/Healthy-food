import jwt from "jsonwebtoken";

const varifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  console.log(token)

  if (!token) {
    throw new Error("Token is Missing");
  }

  try {
    const ismatch = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    if (!ismatch) {
      throw new Error("invalid authorization token");
    }
    req.user = ismatch

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default varifyToken;
