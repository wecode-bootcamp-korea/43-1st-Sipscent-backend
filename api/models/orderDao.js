const appDataSource = require("./dataSource");
const {query} = require("express");

const ORDER_STATUS_ID = Object.freeze({
    '결제완료': 1,
    '상품준비중': 2,
    '배송대기중': 3,
    '출고완료': 4,
    '배송중': 5,
    '배송완료': 6
})

const getOrderList = async (userId) => {
    const [userPoint] = await appDataSource.query(`SELECT ROUND(point) as point
                                                   FROM users
                                                   WHERE id = ${userId}`)
    const [totalPrice] = await appDataSource.query(`SELECT (SELECT ROUND(SUM(items.price * carts.quantity))
                                                            FROM carts
                                                                     INNER JOIN items ON items.id = carts.item_id
                                                                     INNER JOIN users on carts.user_id = users.id
                                                            where user_id = ${userId}
                                                            GROUP BY users.id) as totalPrice
                                                    FROM carts
                                                             INNER JOIN items ON carts.item_id = items.id
                                                             INNER JOIN users ON carts.user_id = users.id
                                                    WHERE carts.user_id = ?
    `, [userId])

    if (Number(userPoint["point"]) < Number(totalPrice["totalPrice"])) {
        await appDataSource.query(`UPDATE users
                                   SET point=900000
                                   WHERE id = ?`, [userId])
        return false;
    }

    return await appDataSource.query(`
        SELECT carts.id,
               carts.item_id,
               users.name                          as username,
               users.email                         as email,
               items.name                          as itemname,
               carts.quantity,
               ROUND(items.price * carts.quantity) as price,
               (SELECT ROUND(SUM(items.price * carts.quantity))
                FROM carts
                         INNER JOIN items ON items.id = carts.item_id
                         INNER JOIN users on carts.user_id = users.id
                where user_id = ${userId}
                GROUP BY users.id)                 as totalPrice,
               Round(users.point)                  as point
        FROM carts
                 INNER JOIN items ON carts.item_id = items.id
                 INNER JOIN users ON carts.user_id = users.id
        WHERE carts.user_id = ?
    `, [userId]);

};

const createPayment = async (userId, userPhoneNumber, userAddress, orderNumber) => {
    const queryRunner = appDataSource.createQueryRunner()
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
            [userId])
        await queryRunner.query(`
            INSERT INTO orders(user_id, user_phone_number, user_address, total_price, order_number, order_status_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [userId, userPhoneNumber, userAddress, totalPrice["totalPrice"], orderNumber, ORDER_STATUS_ID['결제완료']]);
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
        for (let cart of carts) {
            const itemId = cart["item_id"]
            const itemQuantity = cart["quantity"]
            await queryRunner.query(`
                INSERT INTO order_items(item_id, item_quantity, order_id, order_status_id)
                VALUES (?, ?, ?, ?)`, [itemId, itemQuantity, orderId, ORDER_STATUS_ID['결제완료']])
        }
        await queryRunner.query(`
            DELETE
            FROM carts
            WHERE user_id = ?`, [userId]);
        await queryRunner.commitTransaction();
    } catch (err) {
        queryRunner.rollbackTransaction()
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    } finally {
        await queryRunner.release();
    }
};


const getOrderStatus = async (userId) => {

    return await appDataSource.query(`
        SELECT orders.id,
               users.name,
               orders.user_phone_number,
               orders.user_address,
               ROUND(users.point)        as point,
               ROUND(orders.total_price) as total_price,
               orders.order_number,
               order_status.order_status,
               orders.created_at
        FROM orders
                 INNER JOIN users ON users.id = orders.user_id
                 INNER JOIN order_status ON order_status.id = orders.order_status_id
        WHERE user_id = ?
    `, [userId]);
};


module.exports = {
    getOrderList, createPayment, getOrderStatus
};
