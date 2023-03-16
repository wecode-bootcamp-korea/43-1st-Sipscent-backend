const {orderService, cartService} = require("../services");
const {catchAsync} = require("../utils/error");

const getOrderList = catchAsync (async(req, res) => {

        // const userId = req.user.id
        const userId = 9;
        const getOrderList = await orderService.getOrderList(userId);
        if(getOrderList){
                return res.status(201).json({getOrderList})
        }else{
                res.status(201).json({message:"포인트가 충전되었습니다."})
        }

})


const createPayment = catchAsync (async(req, res) => {

        // const userId =req.user.id
        const userId = 9
        const {userPhoneNumber, userAddress} = req.body;
        if ( !userId || !userPhoneNumber || !userAddress) throw new Error('KEY_ERROR')
        await orderService.createPayment(userId, userPhoneNumber, userAddress);
        return res.status(201).json({
            message: "PAYMENT_SUCCESS"
        })

})

const getOrderStatus = catchAsync(async (req, res) => {
            const userId=9
            // const data = req.query;
            // const userId = req.user.id;
            const orderStatus = await orderService.getOrderStatus(userId);
            return res.status(201).json({orderStatus})
    }
)

module.exports = {
    getOrderList, createPayment, getOrderStatus
};
