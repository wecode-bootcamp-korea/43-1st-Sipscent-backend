const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;
  const result = await cartService.createCart(itemId, userId, quantity);
  if (result === 1) {
    return res.status(201).json({ message: "SUCCESS_CREATECART" });
  } else if (result === 0) {
    return res.status(201).json({ message: "SENT_TO_CART" });
  } else if (result === 2) {
    return res.status(201).json({ message: "CART_OVERLOAD" });
  }
});

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const carts = await cartService.getCarts(userId);

  return res.status(200).json({ carts });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const { cartId, quantity } = req.body;
  // const userId = req.user.id;

  const update = await cartService.updateCart(cartId, quantity, userId);
  if (update === 0) {
    return res.status(201).json({ message: "CART_OVERLOAD" });
  } else {
    return res.status(201).json({ update });
  }
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
