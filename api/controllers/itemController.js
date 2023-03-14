const {itemService} = require("../services");
const {catchAsync} = require("../utils/error");

const teabags = catchAsync(async (req, res) => {
    const {category} = req.params;
    let {order, tasting_notes} = req.query
    let price = req.query.price
    const items = await itemService.teabags(order, tasting_notes, price, category)
    res.status(200).json({items})
})

const teacups = catchAsync(async (req, res) => {
    const {category} = req.params;
    let {order, price} = req.query;
    const items = await itemService.teacups(order, price, category);
    res.status(200).json({items})
})

module.exports = {
    teabags, teacups
};
