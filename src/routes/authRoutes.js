const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Email/Password Authentication
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

// Google OAuth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : (process.env.FRONTEND_URL || 'http://localhost:3000')}/signin.html?error=auth_failed`
    }),
    (req, res) => {
        // Force localhost in development to avoid .env misconfiguration issues
        const frontendUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : (process.env.FRONTEND_URL || 'http://localhost:3000');

        // Check if profile is complete
        if (!req.user.programme || !req.user.experience_level) {
            // Append query param to trigger edit mode on dashboard
            return res.redirect(`${frontendUrl}/dashboard.html?action=complete_profile`);
        }
        res.redirect(`${frontendUrl}/dashboard.html`);
    }
);

// Session Management
router.get('/logout', authController.logout);
router.get('/current-user', authController.getCurrentUser);

module.exports = router;
