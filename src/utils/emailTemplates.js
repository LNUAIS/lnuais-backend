exports.verificationEmail = (name, code) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .code-box { background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
    .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to LNUAIS!</h1>
    </div>
    <div class="content">
      <h2>Hi ${name}! 👋</h2>
      <p>Thank you for joining the Linnaeus University AI Society. To complete your registration, please verify your email address.</p>
      
      <div class="code-box">
        <p style="margin: 0; color: #666;">Your verification code is:</p>
        <div class="code">${code}</div>
      </div>
      
      <p><strong>⏰ This code expires in 15 minutes.</strong></p>
      <p>If you didn't create an account, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>© 2025 LNUAIS - Linnaeus University AI Society</p>
    </div>
  </div>
</body>
</html>
`;

exports.passwordResetEmail = (name, code) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .code-box { background: white; border: 2px dashed #f5576c; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
    .code { font-size: 32px; font-weight: bold; color: #f5576c; letter-spacing: 5px; }
    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Reset</h1>
    </div>
    <div class="content">
      <h2>Hi ${name},</h2>
      <p>We received a request to reset your password. Use the code below to create a new password:</p>
      
      <div class="code-box">
        <p style="margin: 0; color: #666;">Your reset code is:</p>
        <div class="code">${code}</div>
      </div>
      
      <p><strong>⏰ This code expires in 15 minutes.</strong></p>
      
      <div class="warning">
        <strong>⚠️ Security Notice:</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      </div>
    </div>
    <div class="footer">
      <p>© 2025 LNUAIS - Linnaeus University AI Society</p>
    </div>
  </div>
</body>
</html>
`;

exports.welcomeEmail = (name) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to LNUAIS!</h1>
    </div>
    <div class="content">
      <h2>Hi ${name}! 🚀</h2>
      <p>Your email has been verified successfully! Welcome to the Linnaeus University AI Society.</p>
      <p>You can now access all our events, workshops, and resources.</p>
      <p>Stay tuned for updates about upcoming AI/ML events!</p>
    </div>
  </div>
</body>
</html>
`;
