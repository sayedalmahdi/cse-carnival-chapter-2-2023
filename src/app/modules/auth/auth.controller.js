const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const authService = require("./auth.service");

const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.createUserInDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginDAta = req.body;
  const result = await authService.loginUser(loginDAta);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

const authController = {
  createUser,
  loginUser,
};

module.exports = authController;
