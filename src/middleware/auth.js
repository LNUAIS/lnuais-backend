exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Authentication required' });
};

exports.requireVerified = (req, res, next) => {
    if (req.user && !req.user.is_verified) {
        return res.status(403).json({ error: 'Email verification required' });
    }
    next();
};

exports.checkProfileComplete = (req, res, next) => {
    if (req.user && (!req.user.programme || !req.user.experience_level)) {
        return res.status(403).json({
            error: 'Profile incomplete',
            message: 'Please complete your profile',
            redirect: '/complete-profile'
        });
    }
    next();
};
