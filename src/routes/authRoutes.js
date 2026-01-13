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
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/signin.html?error=auth_failed` }), // Adjusted redirect to signin.html
    (req, res) => {
        // Check if profile is complete
        if (!req.user.programme || !req.user.experience_level) {
            // Redirect to complet-profile page (or logic in dashboard)
            // Frontend URL handling required here
            // For now, redirect to dashboard as per prompt but noting incomplete profile
            return res.redirect(`${process.env.FRONTEND_URL}/dashboard.html`);
        }
        res.redirect(`${process.env.FRONTEND_URL}/dashboard.html`);
    }
);

// Session Management
router.get('/logout', authController.logout);
router.get('/current-user', authController.getCurrentUser);

module.exports = router;
