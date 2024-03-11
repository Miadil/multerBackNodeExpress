const jwt = require("jsonwebtoken");

const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

const decodeJWT = (token) => {
  return jwt.decode(token, process.env.TOKEN_SECRET);
};

module.exports = { encodeJWT, decodeJWT };
