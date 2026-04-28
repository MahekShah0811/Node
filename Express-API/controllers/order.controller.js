const orderService = require("../services/order.service");


//create order
module.exports.CreateOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {items} = req.body;

        const order = await orderService.CreateOrder({userId, items})

        if(!order){
            return res.status(404).json({message: "Products not found"});
        }

        return res.status(200).json({message: "Order Created Successfuly", order})

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

//get order details and show order status
module.exports.GetOrder = async (req, res) =>{
    try {
        const userId  = req.user.id;
        const order = await orderService.GetOrder(userId);

        if(!order) return res.status(404).json({message: "Order Not Found.."})

        return res.status(200).json({message: "Order Fetch Successfully", order});

        
    } catch (error) {
         return res.status(400).json({message: error.message});
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        const order = await orderService.updateStatus({ orderId, status });

        res.status(200).json({ message: "Order updated", order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};