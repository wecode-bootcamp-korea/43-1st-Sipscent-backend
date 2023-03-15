const { itemDao } = require("../models");

const teabags = async (sorting, tasting_notes, price, category) => {
  return await itemDao.getTeabags(sorting, tasting_notes, price, category);
};

const teacups = async (sorting, price, category) => {
  return await itemDao.getTeacups(sorting, price, category);
};

const detailItem = async (itemId) => {
  return itemDao.getDetailItem(itemId);
};

module.exports = {
  teabags,
  teacups,
  detailItem,
};
