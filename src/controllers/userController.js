const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailService');
const bcrypt = require('bcrypt');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.registerUser = async (req, res) => {
    try {
        const { full_name, email, programme, experience_level, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Generate 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = await User.create({
            full_name,
            email,
            programme,
            experience_level,
            password: hashedPassword,
            verification_code: verificationCode,
            verification_code_expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
            is_verified: false
        });

        // Send verification email (non-blocking)
        sendVerificationEmail(email, full_name, verificationCode);

        res.status(201).json({
            message: 'Registration successful! Please check your email for the verification code.',
            userId: newUser.id,
            email: newUser.email
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get all users with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            users: rows
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get a single user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateUser = async (req, res) => {
    try {
        const { full_name, programme, experience_level } = req.body;
        const userId = req.params.id;

        // Authorization check: Users can only update their own profile
        // Note: req.user is populated by Passport session
        if (req.user && req.user.id !== parseInt(userId)) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.update({
            full_name: full_name || user.full_name,
            programme: programme || user.programme,
            experience_level: experience_level || user.experience_level
        });

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Authorization check
        if (req.user && req.user.id !== parseInt(userId)) {
            return res.status(403).json({ error: 'You can only delete your own account' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
