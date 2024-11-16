const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        code: 404,
        message: 'Not Found'
    });
    next();
};

module.exports = notFound;