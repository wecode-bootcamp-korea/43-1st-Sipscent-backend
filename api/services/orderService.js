const {orderDao} = require("../models");
const {createOrderNumber} = require("../utils/generate");

const getOrderList = async (userId) => {
    return orderDao.getOrderList(userId);
}

const createPayment = async (userId, userPhoneNumber, userAddress) => {
    const orderNumber = await createOrderNumber();
    return orderDao.createPayment(
        userId, userPhoneNumber, userAddress, orderNumber
    );
};

const getOrderStatus = async (userId) => {
    return orderDao.getOrderStatus(userId);
}

module.exports = {
    getOrderList, createPayment, getOrderStatus
};
