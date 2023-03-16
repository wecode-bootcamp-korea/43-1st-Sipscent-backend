const bcrypt = require("bcrypt");
const { userDao } = require("../models");
const {
  emailValidation,
  passwordValidation,
} = require("../utils/validation-check.js");

const makePassword = async (plainPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(plainPassword, salt);
};

const signUp = async (name, email, password) => {
  await emailValidation(email);
  await passwordValidation(password);

  const checkEmail = await userDao.checkRegisterdEmail(email);

  if (checkEmail) {
    const error = new Error("이미 가입된 이메일입니다.");
    error.statusCode = 400;

    throw error;
  }

  const hashPassword = await makePassword(password);
  const point = 900000;

  return userDao.createUser(name, email, hashPassword, point);
};

module.exports = {
  signUp,
};
