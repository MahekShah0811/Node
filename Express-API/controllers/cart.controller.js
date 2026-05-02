const cartModel = require("../models/cart.model");
const cartService = require("../services/cart.service");

// add to cart
module.exports.AddToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // 1. Find the cart
        const cartExist = await cartModel.findOne({ userId });

        // 2. Safely check for duplicates (Check if cartExist is NOT null first)
        if (cartExist && cartExist.items) {
            const isDuplicate = cartExist.items.some((val) => 
                val.productId && val.productId.toString() === productId
            );

            if (isDuplicate) {
                return res.status(400).json({ message: "Product Already Added To Cart!!" });
            }
        }

        // 3. Call service
        const cart = await cartService.addToCart({
            userId, 
            item: { productId, quantity: quantity || 1 }
        });

        return res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        return res.status(400).json({ message: error.message });
    }
};

module.exports.GetCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await cartService.GetCart(userId);

        if (!cart) {
            // Return an empty items array instead of 404 to keep the frontend happy
            return res.status(200).json({ message: "Cart is empty", cart: { items: [] } });
        }

        return res.status(200).json({ message: "Cart Data Fetched!!", cart });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.RemoveItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        
        // Updated service to return the new cart after deletion
        let cart = await cartService.RemoveSingleProduct({ userId, productId });
        
        return res.status(200).json({ message: "Removed successfully", cart });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.UpdateQuantity = async (req, res) => {
    const { productId, quantity } = req.body; // quantity here would be the new absolute number
    const userId = req.user.id;
    
    let cart = await cartModel.findOne({ userId });
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Quantity updated", cart });
    }
};