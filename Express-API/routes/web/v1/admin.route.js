const express = require('express');
const router = express.Router();
// const middleware = require("../../../middlewares/user.middleware")
const middleware = require("../../../middlewares/admin.middleware")
const usermiddleware = require("../../../middlewares/user.middleware")
const adminController = require("../../../controllers/admin.controller")
const { body } = require("express-validator");


// show all users
// login user --> check user is Admin? --> show all users
router.get("/all/user" ,usermiddleware.authUser, middleware.authAdmin , adminController.AllUser)


// delete user
router.delete("/user/:id", usermiddleware.authUser, middleware.authAdmin, adminController.deleteUser)


// manager creation
router.post("/manager/create", [
        body("username").isLength({ min: 4 }).withMessage("Username must be of 4 Charcter!!"),
        body("email").isEmail().withMessage("Enter Valid Email!!"),
        body("password").isLength({ min: 6 }).withMessage("Password must be of 6 Character!!"),
    ],
    usermiddleware.authUser, 
    middleware.authAdmin,
    adminController.registerManager
);

module.exports = router;