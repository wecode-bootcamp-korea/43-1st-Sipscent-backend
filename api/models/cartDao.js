const appDataSource = require("./dataSource");

const createCart = async (itemId, userId, quantity) => {
  const [cartId] = await appDataSource.query(
    `SELECT id
    FROM carts
    WHERE item_id = ?
    `,
    [itemId]
  );

  const [cartQuantity] = await appDataSource.query(
    `SELECT quantity
    FROM carts
    WHERE item_id = ?
    `,
    [itemId]
  );

  const [itemPrice] = await appDataSource.query(
    `SELECT ROUND(price) as price
    FROM items
    WHERE id = ${itemId}`
  );

  const [totalPrice] = await appDataSource.query(
    `SELECT (SELECT ROUND(SUM(items.price * carts.quantity))
                 FROM carts
                          INNER JOIN items ON items.id = carts.item_id
                          INNER JOIN users on carts.user_id = users.id
                 where user_id = ${userId}
                 GROUP BY users.id) AS totalPrice
         FROM carts
                  INNER JOIN users ON users.id = carts.user_id
                  INNER JOIN items ON items.id = carts.item_id
         WHERE users.id = ?
        `,
    [userId]
  );

  if (!totalPrice) {
    await appDataSource.query(
      `INSERT INTO carts (item_id, user_id, quantity)
      VALUES (?, ?, ?)`,
      [itemId, userId, quantity]
    );
  } else if (totalPrice) {
    if (cartId) {
      if (
        Number(totalPrice["totalPrice"]) +
          Number(itemPrice["price"] * quantity) <=
        900000
      ) {
        const newQuantity = cartQuantity["quantity"] + quantity;
        await appDataSource.query(
        `UPDATE carts
        SET quantity = ${newQuantity}
        WHERE id = ${cartId["id"]}`);
        return 1;
      } else {
        return 2;
      }
    } else {
      await appDataSource.query(
        `INSERT INTO carts (item_id, user_id, quantity)
        VALUES (?, ?, ?)`,
        [itemId, userId, quantity]
      );
      return 0;
    }
  }
};

const getUserCart = async (userId) => {
  const result = await appDataSource.query(
    `SELECT c.id                        AS cartId,
                u.id                        AS userId,
                i.id                        AS itemId,
                i.name                      AS itemName,
                item_sizes.teabag_size      AS itemSize,
                ROUND(i.price)              AS itemPrice,
                c.quantity,
                ROUND(i.price * c.quantity) AS totalPrice,
                (SELECT ROUND(SUM(items.price * carts.quantity))
                 FROM carts
                          INNER JOIN items ON items.id = carts.item_id
                          INNER JOIN users on carts.user_id = users.id
                 where user_id = ${userId}
                 GROUP BY u.id)             AS cartTotalPrice
         FROM carts AS c
                  INNER JOIN users AS u ON u.id = c.user_id
                  INNER JOIN items AS i ON i.id = c.item_id
                  LEFT JOIN item_sizes ON item_sizes.id = i.size_id
         WHERE u.id = ?
        `,
    [userId]
  );

  return result;
};

const getUpdateCart = async (cartId, quantity, userId) => {
  const [itemPrice] = await appDataSource.query(
    `SELECT ROUND(items.price) as price
         FROM items
                  INNER JOIN carts ON carts.item_id = items.id
         WHERE carts.id = ${cartId}`
  );

  const [totalPrice] = await appDataSource.query(
    `SELECT (SELECT ROUND(SUM(items.price * carts.quantity))
                 FROM carts
                          INNER JOIN items ON items.id = carts.item_id
                          INNER JOIN users on carts.user_id = users.id
                 where user_id = ${userId}
                 GROUP BY users.id) AS totalPrice
         FROM carts
                  INNER JOIN users ON users.id = carts.user_id
                  INNER JOIN items ON items.id = carts.item_id
         WHERE users.id = ?
        `,
    [userId]
  );
  if (
    Number(totalPrice["totalPrice"]) + Number(itemPrice["price"] * quantity) <=
    900000
  ) {
    await appDataSource.query(
      `UPDATE carts
             SET quantity=?
             WHERE id = ?
               AND user_id = ?
            `,
      [quantity, cartId, userId]
    );
    return getUserCart(userId);
  } else {
    return 0;
  }
};

const getDeleteCart = async (cartId, userId) => {
  await appDataSource.query(
    `DELETE
         FROM carts
         WHERE id IN (?)
           AND user_id = ?
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
