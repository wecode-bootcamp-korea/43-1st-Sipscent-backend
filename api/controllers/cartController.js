const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const postCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;
  await cartService.postCart(itemId, userId, quantity);

  return res.status(201).json({ message: " SUCCESS_POSTCART" });
});

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const carts = await cartService.getCarts(userId);

  return res.status(200).json({ carts });
});

const updateCart = catchAsync(async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;

  const update = await cartService.updateCart(itemId, quantity, userId);
  return res.status(201).json({ update });
});

const deleteCart = catchAsync(async (req, res) => {
  const data = req.query;
  const userId = req.user.id;
  const cartId = data["cart_id"];

  const deleteItem = await cartService.deleteCart(cartId, userId);
  return res.status(201).json({ deleteItem });
});

module.exports = {
  postCart,
  getCarts,
  updateCart,
  deleteCart,
};
