const { itemDao } = require("../models");

const teabags = async (order, tasting_notes, price, category) => {
    const seeTeabags = await itemDao.seeTeabags(order, tasting_notes, price, category);
    return seeTeabags;
}

const teacups = async (order, price, category) => {
    const seeTeacups = await itemDao.seeTeacups(order, price, category);
    return seeTeacups;
}

module.exports = {
 teabags, teacups
};
