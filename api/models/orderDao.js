const appDataSource = require("./dataSource");
const {query} = require("express");

const ORDERBY = Object.freeze({
    'price': 'ORDER BY price ASC',
    '-price': 'ORDER BY price DESC',
    'name': 'ORDER BY name ASC',
    'id': 'ORDER BY id ASC'
})

const ORDER_STATUS_ID = Object.freeze({
    '결제완료': 1,
    '상품준비중':2,
    '배송대기중':3,
    '출고완료':4,
    '배송중':5,
    '배송완료':6
})




const getOrderList = async (userId) => {

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

};


const createPayment = async (userId, userPhoneNumber, userAddress, orderNumber) => {
    const queryRunner = appDataSource.createQueryRunner()
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
        for (let cart of carts) {
            itemPrices.push(cart["quantity"] * cart["price"])
        }
        const totalPrice = itemPrices.reduce((acc, cur) => acc + cur)
        await queryRunner.query(`
            INSERT INTO orders(user_id, user_phone_number, user_address, total_price, order_number, order_status_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [userId, userPhoneNumber, userAddress, totalPrice, orderNumber, ORDER_STATUS_ID['결제완료']]);
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
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    } finally {
        await queryRunner.release();
    }
};

module.exports = {
    getOrderList, createPayment
};
