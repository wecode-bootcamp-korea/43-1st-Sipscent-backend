const appDataSource = require("./dataSource");

const createUser = async (name, email, password, point) => {
  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      password,
      point )
      VALUES(?,?,?,?)`,
    [name, email, password, point]
  );
};

module.exports = {
  createUser,
};
