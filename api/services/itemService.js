const {itemDao} = require("../models/itemDao");

const teabags = async (params, category) => {
    const {
        limit = 10,
        offset = 0,
        sorting,
        tasting_notes,
        price
    } = params;
    const itemType = "teabags"
    return await itemDao.getTeabags(limit, offset, sorting, tasting_notes, price, category, itemType);
};

const teacups = async (params, category) => {
    const {
        limit = 10,
        offset = 0,
        tasting_notes,
        sorting,
        price
    } = params;
    const itemType = "teacups"
    return await itemDao.getTeacups(limit, offset, sorting, tasting_notes, price, category, itemType);
};

const detailItem = async (itemId) => {
    return itemDao.getDetailItem(itemId);
};

module.exports = {
    teabags,
    teacups,
    detailItem,
};
