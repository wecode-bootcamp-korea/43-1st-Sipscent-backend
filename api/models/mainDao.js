const appDataSource = require("./dataSource");

const getUserCart = async (userId) => {
  const result = await appDataSource.query(
    `SELECT
    c.id AS cartId,
    u.id AS userId,
    i.id AS itemId,
    i.name AS itemName,
    item_sizes.teabag_size AS itemSize,
    c.quantity,
    i.price * c.quantity AS totalPrice
    FROM carts AS c
    INNER JOIN users AS u ON u.id=c.user_id
    INNER JOIN items AS i ON i.id=c.item_id
    INNER JOIN item_sizes ON item_sizes.id=i.size_id
    WHERE u.id=?`,
    [userId]
  );

  return result;
};

const getUpdateCart = async (itemId, quantity, userId) => {
  await appDataSource.query(
    `UPDATE carts
      SET quantity=?
      WHERE item_id=? AND user_id=?
    `,
    [quantity, itemId, userId]
  );

  const updateResult = await appDataSource.query(
    `SELECT
    c.id AS cartId,
    u.id AS userId,
    i.id AS itemId,
    i.name AS itemName,
    item_sizes.teabag_size AS itemSize,
    c.quantity,
    i.price * c.quantity AS totalPrice
    FROM carts AS c
    INNER JOIN users AS u ON u.id=c.user_id
    INNER JOIN items AS i ON i.id=c.item_id
    INNER JOIN item_sizes ON item_sizes.id=i.size_id
    WHERE u.id=?`,
    [userId]
  );
  return updateResult;
};

const getDeleteCart = async (cartId, userId) => {
  await appDataSource.query(
    `DELETE FROM carts
      WHERE id IN (?) AND user_id=?
    `,
    [cartId, userId]
  );
};
module.exports = {
  getUserCart,
  getUpdateCart,
  getDeleteCart,
};
