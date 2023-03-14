const { itemService } = require("../services");
const { catchAsync } = require("../utils/error");

const detailItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const detail = await itemService.detailItem(itemId);

  return res.status(200).json({ detail });
});

module.exports = {
  detailItem,
};
