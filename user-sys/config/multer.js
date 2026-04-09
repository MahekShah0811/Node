// process your file upload and save into storage
// you can save your file into two places : 1) Into server (diskStorage) 2) cloud storage (like AWS S3)

const multer = require("multer");
const path = require("path");
const crypto= require("crypto");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(6).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;