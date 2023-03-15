const {orderService} = require("../services");
const {catchAsync} = require("../utils/error");

const getOrderList = catchAsync (async(req, res) => {

        const userId = req.user.id
        const getOrderList = await orderService.getOrderList(userId);
        res.status(201).json({getOrderList})

})


const createPayment = catchAsync (async(req, res) => {

        const userId =req.user.id
        const {userPhoneNumber, userAddress} = req.body;
        if ( !userId || !userPhoneNumber || !userAddress) throw new Error('KEY_ERROR')
        await orderService.createPayment(userId, userPhoneNumber, userAddress);
        return res.status(201).json({
            message: "PAYMENT_SUCCESS"
        })

})


module.exports = {
    getOrderList, createPayment
};
