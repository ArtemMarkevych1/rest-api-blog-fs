const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        success: false,
        code: err.code || 500,
        message: err.message || 'Internal Server Error',
        stack: err.stack || null
    });
};

module.exports = errorHandler;