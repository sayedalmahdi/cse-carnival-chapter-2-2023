const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createUserInDB = async (payload) => {
  const { NID ,Username ,Password , Email ,  FirstName , LastName,  PhoneNumber } = payload;

  const query =
    "INSERT INTO Users (NID ,Username ,Password , Email ,  FirstName , LastName , PhoneNumber) VALUES ( ?, ?,?, ?,?, ?, ?)";
  const values = [NID ,Username ,Password , Email ,  FirstName , LastName , PhoneNumber];

  const selectQuery =
  "SELECT NID ,Username ,Password , Email ,  FirstName , LastName, PhoneNumber FROM Users";

  await pool.promise().query(query, values);

  const [createdUser] = (await pool.promise().query(selectQuery))[0];

  return createdUser;
};

const loginUser = async (payload) => {
  const { Email, Password } = payload;
  const query = "SELECT * FROM Users";
  const values = [Email];

  const [user] = (await pool.promise().query(query, values))[0];

  if (user) {
    if (user.Password === Password) {
      const { NID, Username, Email } = user;

      const accessToken = jwt.sign(
        {
          NID, 
          Username,
          Email,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expires_in }
      );

      return {
        accessToken,
      };
    } else {
      throw new ApiError(401, "Invalid password");
    }
  } else {
    throw new ApiError(404, "User does not exist");
  }
};

const authService = {
  createUserInDB,
  loginUser,
};

module.exports = authService;
