const {orderDao} = require("../models");
const {createOrderNumber} = require("../utils/generate");

const getOrderList = async (userId) => {
    return await orderDao.getOrderList(userId);
}

const createPayment = async (userId, userPhoneNumber, userAddress) => {
    const orderNumber = await createOrderNumber();
    return await orderDao.createPayment(
        userId, userPhoneNumber, userAddress, orderNumber
    );
};

module.exports = {
    getOrderList, createPayment
};
