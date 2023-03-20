const { orderService } = require("../services");
const { catchAsync } = require("../utils/error");

const getOrderList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orderList = await orderService.getOrderList(userId);

  return res.status(201).json({ message: orderList });
});

const createPayment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { userPhoneNumber, userAddress } = req.body;
  if (!userId || !userPhoneNumber || !userAddress) throw new Error("KEY_ERROR");
  await orderService.createPayment(userId, userPhoneNumber, userAddress);
  return res.status(201).json({
    message: "PAYMENT_SUCCESS",
  });
});

const getOrderStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const orderStatus = await orderService.getOrderStatus(userId);
  return res.status(201).json({ orderStatus });
});

module.exports = {
  getOrderList,
  createPayment,
  getOrderStatus,
};
