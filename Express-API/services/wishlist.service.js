const wishlistModel = require("../models/wishlist.model");

module.exports.AddToWishlist = async ({ userId, productId }) => {
    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
        wishlist = new wishlistModel({ userId, productIds: [] });
    }

    // Safety check: Ensure item and item.productId exist before calling toString()
    const exists = wishlist.productIds.some(item => 
        item.productId && item.productId.toString() === productId
    );
    
    if (exists) throw new Error("Product already in wishlist");

    // Matches your schema: productIds: [{ productId: ... }]
    wishlist.productIds.push({ productId }); 
    await wishlist.save();

    return await wishlist.populate({
        path: 'productIds.productId',
        model: 'product'
    });
};

module.exports.GetWishlist = async ({ userId }) => {
    // Populate the field 'productId' inside the 'productIds' array
    return await wishlistModel.findOne({ userId })
        .populate({
            path: 'productIds.productId', 
            model: 'product' // MUST match the name in mongoose.model("product", ...)
        });
};