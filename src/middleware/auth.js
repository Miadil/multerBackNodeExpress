const { decodeJWT } = require("../helper/jwtHelper");

const authorization = async (req, res, next) => {
  try {
    const headerBearerToken = req.headers["authorization"];
    console.log(res.headers);
    //  headerBearerToken
    if (!headerBearerToken) throw new Error();
    const [_, token] = headerBearerToken.split(" ");
    const data = decodeJWT(token);
    console.log("le token decoder :", data);

    return next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = authorization;
