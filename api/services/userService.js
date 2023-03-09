const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const point = 100000;

  return userDao.createUser(name, email, hashPassword, point);
};

const logIn = async (email, password) => {
  await emailValidation(email);
  await passwordValidation(password);

  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("WRONG_EMAIL");
    error.statusCode = 401;

    throw error;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("WRONG_PASSWORD");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return accessToken;
};
module.exports = {
  signUp,
  logIn,
};
