const { itemService } = require("../services");
const { catchAsync } = require("../utils/error");

const detailItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const items = await itemService.detailItem(itemId);

  return res.status(200).json({ items });
});

module.exports = {
  detailItem,
};
