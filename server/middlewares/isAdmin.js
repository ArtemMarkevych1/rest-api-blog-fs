const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role !== 1 && req.user.role !== 2)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = isAdmin;