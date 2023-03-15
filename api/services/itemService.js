const { itemDao } = require("../models");

const teabags = async (sorting, tasting_notes, price, category) => {
    return await itemDao.getTeabags(sorting, tasting_notes, price, category);
}

const teacups = async (order, price, category) => {
    return await itemDao.getTeacups(order, price, category);
}

module.exports = {
 teabags, teacups
};
