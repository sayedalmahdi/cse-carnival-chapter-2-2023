const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const expertService = require("./expert.service");

const createExpert = catchAsync(async (req, res) => {
  const expert = req.body;

  const result = await expertService.createExpertInDB(expert);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expert created successfully",
    data: result,
  });
});

const loginExpert = catchAsync(async (req, res) => {
  const loginDAta = req.body;
  const result = await expertService.loginExpert(loginDAta);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

const expertController = {
  createExpert,
  loginExpert,
};

module.exports = expertController;
