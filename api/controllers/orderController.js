const {orderService} = require("../services");
const {catchAsync} = require("../utils/error");

const order = async (req, res) => {
    try {
        const userId = req.user.id
        const orderList = await orderService.orderList(userId);
        console.log(orderList)
        res.status(201).json({orderList})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}


const payment = async (req, res) => {
    try {
        const userId =req.user.id
        const now = new Date()
        const orderNumber = String(now.getFullYear()) + String(now.getMonth()).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0') + String(Math.floor(Math.random() * 1000)).padStart(4, '0')
        const orderStatusId = 1
        const {userPhoneNumber, userAddress} = req.body;
        if ( !userId || !userPhoneNumber || !userAddress || !orderNumber || !orderStatusId) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await orderService.payment(userId, userPhoneNumber, userAddress, orderNumber, orderStatusId);
        return res.status(201).json({
            message: "PAYMENT_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};


module.exports = {
    order, payment
};
