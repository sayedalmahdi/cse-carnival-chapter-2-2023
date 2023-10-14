const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createExpertInDB = async (payload) => {
  const {  VerificationInfo , Name , Specialization , ClinicAddress , PhoneNumber, Email , VerificationStatus } = payload;

  const query =
    "INSERT INTO Doctors (VerificationInfo , Name , Specialization , ClinicAddress , PhoneNumber, Email , VerificationStatus) VALUES (?, ?, ?, ?,?, ?,?)";
  const values = [VerificationInfo , Name , Specialization , ClinicAddress , PhoneNumber, Email , VerificationStatus];

  const selectQuery =
  "SELECT VerificationInfo , Name , Specialization , ClinicAddress , PhoneNumber, Email , VerificationStatus FROM Doctors";

  await pool.promise().query(query, values);

  const [createdExpert] = (await pool.promise().query(selectQuery))[0];

  return createdExpert;
};

const loginExpert = async (payload) => {
  const { NID ,Email, Password } = payload;
  const query = "SELECT * FROM Users";
  const values = [Email];

  const [user] = (await pool.promise().query(query, values))[0];

  if (expert) {
    if (expert.Password === Password) {
      const { NID, Username, Email } = expert;

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
    throw new ApiError(404, "Expert does not exist");
  }
};

const expertService = {
  createExpertInDB,
  loginExpert,
};

module.exports = expertService;
