const userModel = require("../models/user_model");

// third validation -> check all field are not blank 

module.exports.createUser = async ({ username, email, password }) => {
    if(!username || !email || !password){
        throw new Error("All Field Are Required!!")
    }
    const user = await userModel.create({ username, email, password });
    return user;
};