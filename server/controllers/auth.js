const { User, File } = require('../models');
const generateToken = require('../utils/generateToken');
const comparePasswords = require('../utils/comparePasswords');
const generateCode = require('../utils/generateCode');
const sendEmail = require('../utils/sendEmail');
const hashPassword = require('../utils/hashPassword');

const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            return res.status(400).json({
                success: false,
                message: `This ${field} is already registered`
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 3
        });

        await user.save();

        res.status(201).json({
            success: true,
            code: 201,
            message: "User registered successfully",
            data: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const match = await comparePasswords(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = await generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified"
            });
        }

        const verificationCode = generateCode();
        user.verificationCode = verificationCode;
        await user.save();
        await sendEmail(email, "Verify your email", verificationCode, "verify your account");

        res.status(200).json({
            success: true,
            message: "Verification code sent"
        });
    } catch (error) {
        next(error);
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code"
            });
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User verified successfully"
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const forgotPasswordCode = generateCode();
        user.forgotPasswordCode = forgotPasswordCode;
        await user.save();
        await sendEmail(email, "Reset your password", forgotPasswordCode, "reset your password");

        res.status(200).json({
            success: true,
            message: "Reset password code sent"
        });
    } catch (error) {
        next(error);
    }
};

const recoverPassword = async (req, res, next) => {
    try {
        const { email, code, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.forgotPasswordCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code"
            });
        }

        const isSamePassword = await comparePasswords(password, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as your old password"
            });
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.forgotPasswordCode = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password recovered successfully"
        });
    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const { userId } = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isWrongOldPassword = await comparePasswords(oldPassword, user.password);
        if (!isWrongOldPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid old password"
            });
        }

        const isSamePassword = await comparePasswords(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as your old password"
            });
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
        console.log(user);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    register,
    login,
    verifyEmail,
    verifyUser,
    forgotPassword,
    recoverPassword,
    changePassword,
};