const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createUserInDB = async (payload) => {
  const { UserID, NID, Username, Password, Email, FirstName, LastName, DateOfBirth, PhoneNumber, Address } = payload;

  const query =
    "INSERT INTO Users (UserID, NID, Username, Password, Email, FirstName, LastName, DateOfBirth, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [UserID, NID, Username, Password, Email, FirstName, LastName, DateOfBirth, PhoneNumber, Address];

  const selectQuery =
  "SELECT UserID, NID, Username, Password, Email, FirstName, LastName, DateOfBirth, PhoneNumber, Address FROM Users WHERE id = LAST_INSERT_ID()";

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
