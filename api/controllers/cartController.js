const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  await cartService.createCart(itemId, userId, quantity);

  return res.status(201).json({ message: "SUCCESS_CREATECART" });
});

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const carts = await cartService.getCarts(userId);

  return res.status(200).json({ carts });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId, quantity } = req.body;

  const update = await cartService.updateCart(cartId, quantity, userId);
  return res.status(201).json({ update });
});

const deleteCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = req.query;
  const cartId = data["cart_id"];

  const deleteItem = await cartService.deleteCart(cartId, userId);
  return res.status(201).json({ deleteItem });
});

module.exports = {
  createCart,
  getCarts,
  updateCart,
  deleteCart,
};
