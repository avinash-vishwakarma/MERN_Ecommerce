import jwt from "jsonwebtoken";

const genrateJwtToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

export default genrateJwtToken;
