const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user_model");


module.exports.registerUser = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() });
    }
    const { username, email, password } = req.body;

    // check user if already exist
    let isExist = await userModel.findOne({ email: email });

    if(isExist){
        return res.status(400).json({ message: "User is already registered" })
    }

    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({ 
        username, 
        email, 
        password: hashPassword 
    });

    let token = await user.generateAuthToken();
    res.status(200).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
    let error = validationResult(req);
    
    if (!error.isEmpty()){
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    let checkUser = await userModel.findOne({ email: email }).select("+password");

    if(!checkUser){
        return res.status(401).json({ message: "User Is Not Exists!!" });
    }

    const isMatch = await checkUser.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({ message: "Password is Invalid!!" });
    }

    const token = checkUser.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, checkUser });
};

module.exports.profile = (req, res) => {
    res.status(200).json({ user: req.user });
};

module.exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message: "User Logout Successfully !!"})
}