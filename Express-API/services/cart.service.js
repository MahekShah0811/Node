const cartModel = require("../models/cart.model");

// add items to cart
module.exports.addToCart = async ({ userId, item }) => {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
        cart = new cartModel({ userId, items: [] });
    }

    cart.items.push(item);
    await cart.save();

    // Populate the product details before returning so the frontend can show the card immediately
    return await cart.populate('items.productId');
};

// get cart
module.exports.GetCart = async (userId) => {
    // This is what prevents the "blank cards" on the Cart page
    return await cartModel.findOne({ userId }).populate('items.productId');
};

// remove single product from cart
module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        throw new Error("Cart Not Found!!");
    }

    // Since we are not populated here, productId is just an ID, so equals() works
    const itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));
    
    if (itemIndex < 0) {
        throw new Error("Item Not Found!!");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Return the updated populated cart so the UI updates instantly after deletion
    return await cart.populate('items.productId');
};

// remove single product from cart
module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
    
    // find login user cart
    let cart = await cartModel.findOne({ userId });
    if(!cart){
        throw new Error("Cart Not Found!!");
    }

    // find index number of product based on productId
    const itemIndex = cart.items.findIndex( (i) => i.productId.equals(productId));
    console.log(itemIndex);
    
    if(itemIndex < 0){
        throw new Error("Item Not Found!!");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
};