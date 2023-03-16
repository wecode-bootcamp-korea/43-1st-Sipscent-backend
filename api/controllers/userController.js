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

const checkEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const checkedEmail = await userService.checkEmail(email);

  if (checkedEmail) {
    return res.status(200).json({ message: "이미 가입된 이메일입니다." });
  } else {
    return res.status(200).json({ message: "가입 가능한 이메일입니다." });
  }
});
module.exports = {
  signUp,
  checkEmail,
};
