const wishlistModel = require("../models/wishlist.model");

// add items into wish list

module.exports.AddToWishlist = async ({ userId, items }) => {
    let wishlist = await wishlistModel.findOne({ userId });
    
    if(!wishlist){
    wishlist = new wishlistModel({ userId, productIds: [] });
    }
    
    wishlist.productIds.push(items);
    return await wishlist.save();
};

module.exports.RemoveItem = async ({ userId, productId }) => {
    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) throw new Error("Wishlist not found");

    wishlist.productIds = wishlist.productIds.filter(
        (item) => !item.items.productId.equals(productId)
    );

    return await wishlist.save();
};