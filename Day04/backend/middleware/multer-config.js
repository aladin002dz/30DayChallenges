const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).array("myfile");

/*
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "images"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/\s+/g, "_");
    const extension = path.extname(file.originalname).toLowerCase(); // Extract extension from the original filename
    callback(null, `${name}_${Date.now()}${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload.array("myfile");
*/