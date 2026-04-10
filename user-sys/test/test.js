const autocannon = require("autocannon");
const url = "http://localhost:4000/";
const duration = "10"; // check for 10 seconds
const instance = autocannon({
    url,
    duration
}, (err, result) => {
    if (err) {
        console.log("Server Test Fail!!", err);
    } else {
        console.log("Server Test Result!!");
        console.log(result);
    }
  },
);

autocannon.track(instance);