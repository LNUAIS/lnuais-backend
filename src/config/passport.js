const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjusted import path as User exports directly

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
    proxy: true // Trust the proxy headers (X-Forwarded-Proto) to generate HTTPS callbacks
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Find user by Google ID or email
            let user = await User.findOne({
                where: {
                    // Use Sequelize OR operator
                    [require('sequelize').Op.or]: [
                        { google_id: profile.id },
                        { email: profile.emails[0].value }
                    ]
                }
            });

            if (user) {
                // Update google_id if user signed up with email first
                if (!user.google_id) {
                    user.google_id = profile.id;
                    user.is_verified = true;
                    await user.save();
                }
                return done(null, user);
            }

            // Create new user
            user = await User.create({
                full_name: profile.displayName,
                email: profile.emails[0].value,
                google_id: profile.id,
                is_verified: true,
                // programme and experience_level will be null - redirect to complete profile
            });

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
