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

module.exports = {
  createUser,
  checkRegisterdEmail,
};
