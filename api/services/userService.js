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

  const hashPassword = await makePassword(password);
  const point = 900000;

  return userDao.createUser(name, email, hashPassword, point);
};

const checkEmail = async (email) => {
  return userDao.checkRegisterdEmail(email);
};

module.exports = {
  signUp,
  checkEmail,
};
