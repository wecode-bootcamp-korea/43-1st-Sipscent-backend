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

const checkRegisterdEmail = async (email) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS (
      SELECT 
        id
      FROM users
      WHERE email = ?
    ) as registerd
  `,
    [email]
  );

  return !!parseInt(result.registerd);
};
const getUserByEmail = async (email) => {
  const [result] = await appDataSource.query(
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
  return result;
};

const getUserById = async (id) => {
  const [result] = await appDataSource.query(
    `SELECT
    id,
    name,
    email,
    password,
    point
    FROM users
    WHERE id=?`,
    [id]
  );
  return result;
};

module.exports = {
  createUser,
  checkRegisterdEmail,
  getUserByEmail,
  getUserById,
};
