const appDataSource = require("./dataSource");

const createCart = async (itemId, userId, quantity) => {
  return appDataSource.query(
    `INSERT INTO carts(
      item_id,
      user_id,
      quantity)
      VALUES(?,?,?)`,
    [itemId, userId, quantity]
  );
};

const getUserCart = async (userId) => {
  const result = await appDataSource.query(
    `SELECT
    c.id AS cartId,
    u.id AS userId,
    i.id AS itemId,
    i.name AS itemName,
    item_sizes.teabag_size AS itemSize,
    ROUND(i.price)AS itemPrice,
    c.quantity,
    ROUND(i.price * c.quantity) AS totalPrice,
    (SELECT ROUND(SUM(items.price * carts.quantity)) 
    FROM carts
    INNER JOIN items ON items.id = carts.item_id
    GROUP BY u.id) AS cartTotalPrice
    FROM carts AS c
    INNER JOIN users AS u ON u.id=c.user_id
    INNER JOIN items AS i ON i.id=c.item_id
    LEFT JOIN item_sizes ON item_sizes.id=i.size_id
    WHERE u.id=?
    `,
    [userId]
  );
  console.log(result);
  return result;
};

const getUpdateCart = async (cartId, quantity, userId) => {
  await appDataSource.query(
    `UPDATE carts
      SET quantity=?
      WHERE id=? AND user_id=?
    `,
    [quantity, cartId, userId]
  );
  return getUserCart(userId);
};

const getDeleteCart = async (cartId, userId) => {
  await appDataSource.query(
    `DELETE FROM carts
      WHERE id IN (?) AND user_id=?
    `,
    [cartId, userId]
  );
  return getUserCart(userId);
};
module.exports = {
  createCart,
  getUserCart,
  getUpdateCart,
  getDeleteCart,
};
