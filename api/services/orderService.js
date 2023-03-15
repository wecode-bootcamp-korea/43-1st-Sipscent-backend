const { orderDao } = require("../models");

const orderList = async (userId) => {
    return await orderDao.getOrder(userId);
}

const payment = async (userId, userPhoneNumber, userAddress, orderNumber, orderStatusId) => {
    return await orderDao.paymentSuccess(
        userId, userPhoneNumber, userAddress, orderNumber, orderStatusId
    );
};


module.exports = {
    orderList, payment
};
