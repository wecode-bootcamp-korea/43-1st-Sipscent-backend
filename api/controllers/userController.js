const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  await userService.signUp(name, email, password);

  return res.status(201).json({ message: "SUCCESS_SIGNUP" });
});

module.exports = {
  signUp,
};
