const { itemDao } = require("../models");

const detailItem = async (itemId) => {
  return itemDao.getDetailItem(itemId);
};
module.exports = {
  detailItem,
};
