const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createUserInDB = async (payload) => {
  const { name, gender, designation, phoneNumber, password } = payload;

  const query =
    "INSERT INTO users (name, gender, designation, phoneNumber, password) VALUES (?, ?, ?, ?, ?)";
  const values = [name, gender, designation, phoneNumber, password];

  const selectQuery =
    "SELECT name, gender, designation, phoneNumber FROM users WHERE id = LAST_INSERT_ID()";

  await pool.promise().query(query, values);

  const [createdUser] = (await pool.promise().query(selectQuery))[0];

  return createdUser;
};

const loginUser = async (payload) => {
  const { phoneNumber, password } = payload;
  const query = "SELECT * FROM users WHERE phoneNumber = ?";
  const values = [phoneNumber];

  const [user] = (await pool.promise().query(query, values))[0];

  if (user) {
    if (user.password === password) {
      const { id, name, phonenumber } = user;

      const accessToken = jwt.sign(
        {
          id,
          name,
          phonenumber,
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
