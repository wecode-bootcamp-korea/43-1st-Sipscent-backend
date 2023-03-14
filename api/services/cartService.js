const { cartDao } = require("../models");

const postCart = async (itemId, userId, quantity) => {
  return cartDao.createCart(itemId, userId, quantity);
};

const getCarts = async (userId) => {
  return cartDao.getUserCart(userId);
};

const updateCart = async (itemId, quatity, userId) => {
  return cartDao.getUpdateCart(itemId, quatity, userId);
};

const deleteCart = async (cartId, userId) => {
  return cartDao.getDeleteCart(cartId, userId);
};

module.exports = {
  postCart,
  getCarts,
  updateCart,
  deleteCart,
};
