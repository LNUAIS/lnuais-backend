const Joi = require('joi');

const registerSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // Added password field
    programme: Joi.string().required(),
    experience_level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required()
});

const validateRegistration = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.log('❌ Validation Error:', error.details[0].message); // Debug log
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateRegistration };
