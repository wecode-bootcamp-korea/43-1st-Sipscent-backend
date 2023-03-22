const {itemService} = require("../services");
const {catchAsync} = require("../utils/error");

const teabags = catchAsync(async (req, res) => {
    const {category} = req.params
    const items = await itemService.teabags(req.query, category);
    res.status(200).json({items});
});

const teacups = catchAsync(async (req, res) => {
    const {category} = req.params;
    const items = await itemService.teacups(req.query, category);
    res.status(200).json({items});
});

const detailItem = catchAsync(async (req, res) => {
    const {itemId} = req.params;
    const items = await itemService.detailItem(itemId);
    return res.status(200).json({items});
});

module.exports = {
    teabags,
    teacups,
    detailItem,
};
