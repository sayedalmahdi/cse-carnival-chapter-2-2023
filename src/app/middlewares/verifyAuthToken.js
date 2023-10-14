const config = require("../../config");
var jwt = require("jsonwebtoken");
const ApiError = require("../../errors/ApiError");
const pool = require("../../pool");

const verifyAuthToken = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new ApiError(401, "Authorization token not provided");
    }

    const authTokenData = jwt.verify(authToken, config.jwt.secret);

    if (!authTokenData) {
      throw new ApiError(401, "Invalid authorization token");
    }

    const userID = authTokenData.id;
    const query = "SELECT * FROM users WHERE id = ?";
    const values = [userID];

    const [user] = (await pool.promise().query(query, values))[0];

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.verifiedUser = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyAuthToken;
