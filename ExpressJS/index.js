// Create an express server


// package.json => type = module => import
// package.json => type = commonjs => const, require

const express = require('express');
const path = require('path');
const app = express();

// Middleware => function that runs before the route, call before function
// Usecase => authorization, authentication, validation, error, etc
// 1) User request => server
// 2) Between 1 and 3 => middleware : with this, user request => middleware(server) => server route
// 3) (server get request) Server response => user
app.use((req, res, next) => {
    console.log('🔺 Middleware is running 🏃‍♀️');
    next(); // Call the next middleware or route handler
});
// login request => middleware(check user into database) => server route (profile page) 


// create a route for the home page(/)
app.get('/', (req, res) => {
    res.send('༼ つ ◕_◕ ༽つ  Welcome to Express.js!!');
});

app.get('/login', (req, res) => {
    const dirPath = path.resolve();
    const FilePath = path.join(dirPath, "Pages", "login.html");
    res.sendFile(FilePath);
});

app.get('/signup', (req, res) => {
    res.send('╰(*°▽°*)╯ This is the Signup Page!!');
});

app.get('/profile', (req, res) => {
    res.send('(❁´◡`❁) This is your Profile Page!!');
});

app.listen(4000, () => {
    console.log('🔺 Server is running on port localhost:4000');
});

// error handling :
// Always write after all route bcz it will catch all the errors that are not handled by the previous routes
app.use((req, res) => {
    res.status(404).send('Page Not Found ❌');
    res.status(500).send('Something Went Wrong 😕');
});