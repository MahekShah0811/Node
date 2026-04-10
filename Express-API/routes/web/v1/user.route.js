const express = require("express");
const { validationResult } = require("express-validation");

const router = express.Router();



// register user
// second validation -> use express validator package
router.post("/register", [
    body("username").isLength({ min: 4 }).withMessage("Username must be of 4 Charcter!!"),
    body("email").isEmail().withMessage("Enter Valid Email!!"),
    body("password").isLength({ min: 6 }).withMessage("Password must be of 6 Charcter"),
]);




module.exports = router;