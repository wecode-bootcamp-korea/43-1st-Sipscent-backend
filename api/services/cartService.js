const { cartDao } = require("../models");

const createCart = async (itemId, userId, quantity) => {
  return cartDao.createCart(itemId, userId, quantity);
};

const getCarts = async (userId) => {
  return cartDao.getUserCart(userId);
};

const updateCart = async (cartId, quantity, userId) => {
  return cartDao.getUpdateCart(cartId, quantity, userId);
};

const deleteCart = async (cartId, userId) => {
  return cartDao.getDeleteCart(cartId, userId);
};

module.exports = {
  createCart,
  getCarts,
  updateCart,
  deleteCart,
};
