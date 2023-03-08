const bcrypt = require("bcrypt");
const { userDao } = require("../models");

const makePassword = async (plainPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(plainPassword, salt);
};

const signUp = async (name, email, password) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^[0-9]{6,}$/;

  if (!emailRegex.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }

  const hashPassword = await makePassword(password);
  console.log(hashPassword);

  const point = 100000;

  console.log(userDao);

  return userDao.createUser(name, email, hashPassword, point);
};

module.exports = {
  signUp,
};
