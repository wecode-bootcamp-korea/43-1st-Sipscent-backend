const { itemService } = require("../services");
const { catchAsync } = require("../utils/error");

const teabags = catchAsync (async (req, res) => {

        const {category} = req.params;
        const data = req.query;
        const items = await itemService.teabags(data, category)
        res.status(200).json({items})

})

const teacups = catchAsync (async (req, res) => {

        const {category} = req.params
        const data = req.query;
        const items = await itemService.teacups(data, category);
        res.status(200).json({items})

})

module.exports = {
   teabags, teacups
};
