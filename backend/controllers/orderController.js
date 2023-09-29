const Order = require("../models/orderModel");

module.exports = {
    updateOrderStatus,
    getAllOrders,
    deleteOrder,
    getMyOrders
};


// // @desc Get all orders
// // @route GET /api/orders
// // @access Private/Admin
async function getAllOrders(req,res){
    try{
        const orders = await Order.find({});
        res.json({ title: "All Orders", orders });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}

// get orders for one user
async function getMyOrders(req,res){
    try{
        const orders = await Order.find({user: req.user._id});
        res.json({ title: "My Orders", orders });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}


// // @desc Update order to delivered
// // @route PUT /api/orders/:id/deliver
// // @access Private/Admin
async function updateOrderStatus(req, res){
    console.log("update order status", req.body)
    console.log("update order status", req.params)
    try {
        const order = await Order.findById(req.params.id);
        order.status = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }
        console.log("order", order)
        await order.save();
        res.json({ title: "Order Detail", order });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}


async function deleteOrder(req, res){
    console.log("Request params:", req.params);
    try{
        await Order.findByIdAndDelete(req.params.id);
        const orders = await Order.find({});
        res.json({ title: "All Orders", orders });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: err.message });
    }
}