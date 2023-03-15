const {itemService} = require("../services");
const {catchAsync} = require("../utils/error");

const teabags = catchAsync(async (req, res) => {
    const {category} = req.params;
    let {sorting} = req.query
    const {tasting_notes, price} = req.query
    const items = await itemService.teabags(sorting, tasting_notes, price, category)
    res.status(200).json({items})
})

const teacups = catchAsync(async (req, res) => {
    const {category} = req.params;
    let {sorting, price} = req.query;
    const items = await itemService.teacups(sorting, price, category);
    res.status(200).json({items})
})

module.exports = {
    teabags, teacups
};
