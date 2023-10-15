const pool = require("../../../pool");

const getAllUsersFromDB = async () => {
  const query = "SELECT * FROM users";

  const users = (await pool.promise().query(query))[0];

  return users;
};

const getUserByIdFromDB = async (ID) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const values = [ID];

  const [user] = (await pool.promise().query(query, values))[0];

  return user;
};

const userService = {
  getAllUsersFromDB,
  getUserByIdFromDB,
};

module.exports = userService;
