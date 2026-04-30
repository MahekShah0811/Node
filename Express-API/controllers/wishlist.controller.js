const wishlistService = require('../services/wishlist.service');
// add items to wishlist
module.exports.AddToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;
        const wishlist = await wishlistService.AddToWishlist({ userId, items });

        if(!wishlist){
            return res.status(404).json({message: "Product Not Found..."})
        }

        return res.status(200).json({message: "Add Item into wishlist",wishlist})
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.RemoveFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const wishlist = await wishlistService.RemoveItem({ userId, productId });

        res.status(200).json({ message: "Removed from wishlist", wishlist });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.GetWishlist = async (req, res) => {
    try {
        // Ensure this matches your middleware (req.user._id or req.user.id)[cite: 1, 2]
        const userId = req.user._id || req.user.id; 
        
        const wishlist = await wishlistService.GetWishlist({ userId });
        
        // If wishlist doesn't exist yet, return an empty array instead of an error
        if (!wishlist) {
            return res.status(200).json({ wishlist: { productIds: [] } });
        }

        return res.status(200).json({ wishlist });
    } catch (error) {
        console.log("Backend Error:", error.message); // This helps you debug
        return res.status(400).json({ message: error.message });
    }
};