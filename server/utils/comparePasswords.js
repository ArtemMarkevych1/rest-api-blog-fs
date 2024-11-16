const bcrypt = require('bcrypt');

const comparePasswords = async (candidatePassword, hashedPassword) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = comparePasswords;
