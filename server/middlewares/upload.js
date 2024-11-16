const multer = require('multer');
const fileFilter = require('../utils/fileFilter');
const storage = require('../utils/storage');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ 
    storage: storage, 
    fileFilter, 
    limits: { fileSize: 50 * 1024 * 1024 } 
});

module.exports = upload;