const createOrderNumber = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_now = new Date(utc + (KR_TIME_DIFF))
  const orderNumber =
      String(kr_now.getFullYear()) +
      String(kr_now.getMonth() + 1).padStart(2, "0") +
      String(kr_now.getDate()).padStart(2, "0") +
      String(kr_now.getHours()).padStart(2, "0") +
      String(kr_now.getMinutes()).padStart(2, "0") +
      String(kr_now.getSeconds()).padStart(2, "0") +
      String(Math.floor(Math.random() * 1000)).padStart(4, "0");
  return orderNumber;
};

module.exports = {
  createOrderNumber,
};
