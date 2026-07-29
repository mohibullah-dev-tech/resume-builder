const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const uploadDirectory = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

//configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
        }
    };

    const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    module.exports = upload;
