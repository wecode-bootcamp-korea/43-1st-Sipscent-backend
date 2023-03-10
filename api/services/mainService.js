const { mainDao } = require("../models");

const getCart = async (userId) => {
  return await mainDao.getUserCart(userId);
};

const updateCart = async (itemId, quatity, userId) => {
  return await mainDao.getUpdateCart(itemId, quatity, userId);
};

const deleteCart = async (cartId, userId) => {
  return await mainDao.getDeleteCart(cartId, userId);
};

module.exports = {
  getCart,
  updateCart,
  deleteCart,
};
