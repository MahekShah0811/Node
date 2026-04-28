const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

module.exports.CreateOrder = async ({ userId, items }) => {
    let totalAmount = 0;
    let orderItems = [];

    for (let item of items) {
        const product = await productModel.findById(item.productId);

        if (!product) throw new Error("Product Not Found");

        // ❗ CHECK STOCK
        if (product.stock < item.quantity) {
            throw new Error(`${product.name} is out of stock`);
        }

        // ✅ DEDUCT STOCK
        product.stock -= item.quantity;
        await product.save();

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
            total: itemTotal
        });
    }

    return await orderModel.create({
        userId,
        items: orderItems,
        totalbill: totalAmount,
        status: "pending"
    });
};

module.exports.updateStatus = async ({ orderId, status }) => {
    return await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
};