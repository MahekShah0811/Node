const userModel = require("../models/user_model")
const adminService = require("../services/admin.service");

module.exports.AllUser = async (req, res) => {
    try {
        const users = await adminService.getAllUser();
        return res.status(200).json({message: "User Fetch Sucessfully!!", users})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await adminService.deleteUser(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User Not Found" })
        }
        return res.status(200).json({ message: "User Deleted Sucessfully!!" })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}