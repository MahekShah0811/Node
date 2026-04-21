// show all user logic
const userModel = require("../models/user_model")

// get all user
module.exports.getAllUser = async () => {
    const allUser = await userModel.find();
    return allUser;
}

// delete user
module.exports.deleteUser = async (id) => {
    const user = await userModel.findOneAndDelete({ _id: id })
    return user;
}

// manager created
module.exports.createManager = async ({ username, email, password, role }) => {
    if(!username || !email || !password){
        throw new Error("All Field Are Required!!")
    }
    const user = await userModel.create({ username, email, password, role: "manager" });
    return user;
};