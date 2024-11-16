const { v4: uuidv4 } = require('uuid');
const File = require('../models/File');
const deleteFileFromUploads = require('../middlewares/delete');

const getFiles = async (req, res, next) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        next(error);
    }
};

const uploadFile = async (req, res, next) => {
    try {
        const { file } = req;
        const { userId } = req.user;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        
        const filePath = file.path.replace(/\\/g, '/');

        const newFile = new File({
            key: uuidv4(),
            originalName: file.originalname,
            path: filePath,
            size: file.size,
            mimeType: file.mimetype,
            createdBy: userId
        });

        await newFile.save();

        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            file: {
                id: newFile._id,
                key: newFile.key,
                originalName: newFile.originalName,
                size: newFile.size,
                mimeType: newFile.mimeType,
                path: newFile.path,
                createdAt: newFile.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

const deleteFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        
        // Find file in MongoDB
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        // Check if user owns the file or is admin
        if (file.createdBy.toString() !== userId && req.user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this file"
            });
        }

        // Add check for file.path
        if (!file.path) {
            return res.status(400).json({
                success: false,
                message: "File path is missing"
            });
        }

        // Delete physical file using the path stored in the database
        await deleteFileFromUploads(file.path);

        // Delete file record from MongoDB
        await File.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile,
    deleteFile,
    getFiles
};