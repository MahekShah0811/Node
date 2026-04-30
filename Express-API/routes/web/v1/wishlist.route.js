const express = require("express");
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware");
const wishlistController = require("../../../controllers/wishlist.controller");

// 1. GET ALL ITEMS (The one causing the error)
router.get("/all", userMiddleware.authUser, wishlistController.GetWishlist);

// 2. ADD ITEM
router.post("/add", userMiddleware.authUser, wishlistController.AddToWishlist);

// 3. REMOVE ITEM
router.delete("/remove/:id", userMiddleware.authUser, wishlistController.RemoveFromWishlist);

module.exports = router;