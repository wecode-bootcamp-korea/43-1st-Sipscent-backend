const appDataSource = require("./dataSource");

const createUser = async (name, email, password, point) => {
  return appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      password,
      point )
      VALUES(?,?,?,?)`,
    [name, email, password, point]
  );
};

const getUserByEmail = async (email) => {
  const result = await appDataSource.query(
    `SELECT
    id,
    name,
    email,
    password,
    point
    FROM users
    WHERE email=?`,
    [email]
  );
  return result[0];
};
module.exports = {
  createUser,
  getUserByEmail,
};
