const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    programme: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    experience_level: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true, // created_at, updated_at
    underscored: true // Use snake_case for DB columns (created_at)
});

module.exports = User;
