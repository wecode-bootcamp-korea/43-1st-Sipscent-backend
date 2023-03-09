const emailValidation = (email) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (!emailRegex.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }
};

const passwordValidation = (password) => {
  const passwordRegex = /^[0-9]{6,}$/;

  if (!passwordRegex.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  emailValidation,
  passwordValidation,
};
