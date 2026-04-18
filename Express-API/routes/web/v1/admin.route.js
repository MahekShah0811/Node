const express = require('express');
const router = express.Router();
// const middleware = require("../../../middlewares/user.middleware")
const middleware = require("../../../middlewares/admin.middleware")
const usermiddleware = require("../../../middlewares/user.middleware")
const adminController = require("../../../controllers/admin.controller")


// show all users
// login user --> check user is Admin? --> show all users
router.get("/all/user" ,usermiddleware.authUser, middleware.authAdmin , adminController.AllUser)


// delete user
router.delete("/user/:id", usermiddleware.authUser, middleware.authAdmin, adminController.deleteUser)

module.exports = router;