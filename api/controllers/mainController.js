const { mainService } = require("../services");
const { catchAsync } = require("../utils/error");

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const cart = await mainService.getCart(userId);

  const price = [];
  for (key in cart) {
    price.push(Number(cart[key].totalPrice));
  }

  const add = (price) => price.reduce((acc, cur) => acc + cur, 0);
  const sumPrice = add(price);

  return res.status(200).json({ message: cart, price, sumPrice });
});

const updateCart = catchAsync(async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;

  const update = await mainService.updateCart(itemId, quantity, userId);
  return res.status(201).json({ message: update });
});

const deleteCart = catchAsync(async (req, res) => {
  const data = req.query;
  const userId = req.user.id;
  const cartId = data["cart_id"];

  await mainService.deleteCart(cartId, userId);
  return res.status(204).json({ message: "SUCCESS_DELETE" });
});

module.exports = {
  getCart,
  updateCart,
  deleteCart,
};
