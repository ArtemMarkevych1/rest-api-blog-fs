const fs = require('fs');
const path = require('path');

const deleteFileFromUploads = (filePath) => {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, '..', filePath);
        fs.unlink(fullPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

module.exports = deleteFileFromUploads;