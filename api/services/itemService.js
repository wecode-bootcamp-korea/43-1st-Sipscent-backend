const { itemDao } = require("../models");

const teabags = async (data, category) => {
    const seeTeabags = await itemDao.seeTeabags(data, category);
    return seeTeabags;
}

const teacups = async (data, category) => {
    const seeTeacups = await itemDao.seeTeacups(data, category);
    return seeTeacups;
}

module.exports = {
 teabags, teacups
};
