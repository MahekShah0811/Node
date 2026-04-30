const wishlistModel = require("../models/wishlist.model");

// Add Item: Clean push matching the schema
module.exports.AddToWishlist = async ({ userId, productId }) => {
    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
        wishlist = new wishlistModel({ userId, productIds: [] });
    }

    const exists = wishlist.productIds.some(item => item.productId.toString() === productId);
    if (exists) throw new Error("Product already in wishlist");

    // Matches schema: { productId: ... }
    wishlist.productIds.push({ productId }); 
    return await wishlist.save();
};

// Get Wishlist with the CORRECT path
module.exports.GetWishlist = async ({ userId }) => {
    return await wishlistModel.findOne({ userId })
        .populate({
            path: 'productIds.productId', // 👈 REMOVED '.items' to match your latest schema
            model: 'product' 
        });
};