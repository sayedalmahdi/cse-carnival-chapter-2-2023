const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const userService = require("./user.service");

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all user",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userService.getUserByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "all user",
    data: result,
  });
});

const userController = {
  getAllUsers,
  getUserById,
};

module.exports = userController;
