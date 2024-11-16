// file filter for multer

const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype;
    // allow images, pdf, doc, docx, xls, xlsx, ppt, pptx
    if (!mimeType.startsWith('image/')
        && !mimeType.startsWith('application/pdf')
        && !mimeType.startsWith('application/msword')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        && !mimeType.startsWith('application/vnd.ms-excel')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        && !mimeType.startsWith('application/vnd.ms-powerpoint')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
        req.fileValidationError = 'Only image, pdf, doc, docx, xls, xlsx, ppt, pptx files are allowed!';
        return cb(new Error('Only image, pdf, doc, docx, xls, xlsx, ppt, pptx files are allowed!'), false);
    }
    cb(null, true);
};

module.exports = fileFilter;