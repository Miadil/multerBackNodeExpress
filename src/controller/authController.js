const validateLogin = require("../validator/authValidator");
const { findByEmail } = require("../model/userModel");
const { verifyPassword } = require("../helper/argonHelper");
const { encodeJWT } = require("../helper/jwtHelper");

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    const [user] = await findByEmail(req.body.email);
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }
    const passwordVerification = await verifyPassword(
      user.password,
      req.body.password
    );
    if (!passwordVerification) {
      return res.status(401).send("Invalid Credentials");
    }
    delete user.password;
    const token = encodeJWT(user);
    res.cookie("auth_token", token, { httpOnly: true, secure: false });
    res.status(200).json({ user: user.name });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const logout = async (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = { login, logout };
