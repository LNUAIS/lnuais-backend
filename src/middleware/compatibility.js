// Route compatibility middleware for frontend
const routeAliases = {
    'POST /users/login': '/api/auth/login',
    'POST /users/verify-email': '/api/auth/verify-email',
    'POST /users/resend-verification': '/api/auth/resend-verification',
    'POST /users/request-password-reset': '/api/auth/request-password-reset',
    'POST /users/reset-password': '/api/auth/reset-password',
    'GET /users/google': '/api/auth/google',
    'GET /users/logout': '/api/auth/logout',
    'GET /users/current-user': '/api/auth/current-user',
    // Specific fix for register if needed, though prompt didn't explicitly ask for it, 
    // frontend uses /users/new_member in signup.html which maps to register
    'POST /users/new_member': '/api/users/register'
};

module.exports = (req, res, next) => {
    const key = `${req.method} ${req.path}`; // Use req.path to ignore query params
    if (routeAliases[key]) {
        console.log(`🔄 Route alias: ${req.path} → ${routeAliases[key]}`);
        req.url = routeAliases[key]; // Update url to new path
    }
    next();
};
