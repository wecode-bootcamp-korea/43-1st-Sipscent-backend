const appDataSource = require("./dataSource");
const {query} = require("express");

const ORDERBY = Object.freeze({
    'price': 'ORDER BY price ASC',
    '-price': 'ORDER BY price DESC',
    'name': 'ORDER BY name ASC',
    'id': 'ORDER BY id ASC'
})

const queryRunner = appDataSource.createQueryRunner()


const getOrder = async (userId) => {
    try {
        return await appDataSource.query(`
            SELECT carts.id,
                   carts.item_id,
                   users.name as username,
                   users.email as email,
                   items.name as itemname,
                   carts.quantity,
                   ROUND(items.price * carts.quantity) as price,
                   (SELECT ROUND (sum(items.price * carts.quantity)) FROM carts INNER JOIN items ON items.id = carts.item_id) as totalPrice,
                   Round(users.point) as point
            FROM carts
                     INNER JOIN items ON carts.item_id = items.id
                     INNER JOIN users ON carts.user_id = users.id
            WHERE carts.user_id = ?
        `, [userId]);
    } catch (err) {
        const error = new Error('CANNOT_SEE_ORDER_LIST');
        err.statusCode = 500;
        throw error;
    }
};


const paymentSuccess = async (userId, userPhoneNumber, userAddress, orderNumber, orderStatusId) => {
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const carts = await queryRunner.query(`SELECT carts.item_id,
                                                      carts.quantity,
                                                      items.price,
                                                      users.point
                                               FROM carts
                                                        INNER JOIN items ON carts.item_id = items.id
                                                        INNER JOIN users ON users.id = carts.user_id
                                               WHERE carts.user_id = ?`, [userId])
        const itemPrices = [];
        for (let x of carts) {
            itemPrices.push(x["quantity"] * x["price"])
        }
        const totalPrice = itemPrices.reduce((acc, cur) => acc + cur)
        await queryRunner.query(`
            INSERT INTO orders(user_id, user_phone_number, user_address, total_price, order_number, order_status_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [userId, userPhoneNumber, userAddress, totalPrice, orderNumber, orderStatusId]);
        const [point] = await queryRunner.query(`
            SELECT point
            FROM users
            WHERE id = ?
        `, [userId]);
        const remainPoint = point["point"] - totalPrice
        if (remainPoint < 0) throw new Error('POINT_IS_LESS_THAN_TOTAL_PRICE')
        await queryRunner.query(
            `UPDATE users
             SET point = ?
             WHERE id = ?`, [remainPoint, userId]);
        const [orders] = await queryRunner.query(`SELECT id
                                                  FROM orders
                                                  WHERE user_id = ?`, [userId])
        const orderId = orders["id"]
        for (let x of carts) {
            const itemId = x["item_id"]
            const itemQuantity = x["quantity"]
            await queryRunner.query(`
                INSERT INTO order_items(item_id, item_quantity, order_id, order_status_id)
                VALUES (?, ?, ?, ?)`, [itemId, itemQuantity, orderId, orderStatusId])
        }
        await queryRunner.query(`
            DELETE
            FROM carts
            WHERE user_id = ?`, [userId]);
        await queryRunner.commitTransaction();
    } catch (err) {
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    } finally {
        await queryRunner.release();
    }
};

module.exports = {
    getOrder, paymentSuccess
};
