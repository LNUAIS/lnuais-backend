const nodemailer = require('nodemailer');
require('dotenv').config();
const { verificationEmail, passwordResetEmail, welcomeEmail } = require('./emailTemplates');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendVerificationEmail = async (email, name, code) => {
    try {
        await transporter.sendMail({
            from: `"LNU AIS" <${process.env.MAIL_USERNAME}>`,
            to: email,
            subject: 'Verify Your Email - LNU AIS',
            html: verificationEmail(name, code)
        });
        console.log(`✅ Verification email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending verification email:', error);
    }
};

exports.sendPasswordResetEmail = async (email, name, code) => {
    try {
        await transporter.sendMail({
            from: `"LNU AIS" <${process.env.MAIL_USERNAME}>`,
            to: email,
            subject: 'Password Reset Request - LNU AIS',
            html: passwordResetEmail(name, code)
        });
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending password reset email:', error);
    }
};

exports.sendWelcomeEmail = async (email, name) => {
    try {
        await transporter.sendMail({
            from: `"LNU AIS" <${process.env.MAIL_USERNAME}>`,
            to: email,
            subject: 'Welcome to LNU AIS! 🎉',
            html: welcomeEmail(name)
        });
        console.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
    }
};
