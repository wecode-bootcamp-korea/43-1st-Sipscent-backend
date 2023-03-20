const createOrderNumber = () => {
  const now = new Date();
  const orderNumber =
    String(now.getFullYear()) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0") +
    String(Math.floor(Math.random() * 1000)).padStart(4, "0");
  return orderNumber;
};

module.exports = {
  createOrderNumber,
};
