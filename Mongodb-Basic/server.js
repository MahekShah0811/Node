const express = require("express");
const app = express();
const userModel = require("./model/user_model");

app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.set("view engine", 'ejs')


app.get("/",(req, res)=>{

     res.send("Server HomePage")

})

// CRUD
// Create
app.get("/create", async(req, res) => {
   let createdUser = await userModel.create({
        username: 'test3',
        name: 'test4 user',
        email: "test4@gmail.com"
   });
res.send(createdUser);
});


// Read
// all user
app.get("/all", async (req, res) => {
    let allUsers = await userModel.find();
    res.send(allUsers);
});

// // specific user - first only
app.get("/read", async (req, res) => {
    let user = await userModel.findOne ({ username : "test3"});
    res.send(user);
});

// all user based on query
app.get("/user", async (req, res) => {
    let userData = await userModel.find ({ username : "test3"});
    res.send(userData);
});


// Update
app.get("/update", async (req, res) => {
    let updatedUser =  await userModel.findOneAndUpdate(
        { username: "test1" },  // find query -> what will be change
        { username : "Coder", email : "coder@developer.com" },  // update query -> what we want to change
        { new : true }
    );
    res.send(updatedUser);
});


// Delete
app.get("/delete", async (req, res) => {
    await userModel.findOneAndDelete ({ username : "Coder" });
    res.redirect("/all");
});


app.listen(3000,()=>{
    console.log("Server is running 🏃‍♀️ on localhost:3000")
})

