const mongoose = require('mongoose');

const WishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // Simplified: Array of objects, each containing a productId[cite: 1]
    productIds: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product" // Ensure this matches your Product model name exactly[cite: 1]
            }
        }
    ]
});

module.exports = mongoose.model("wishlist",WishlistSchema)