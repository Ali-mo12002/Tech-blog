const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}
Comment.init(
    {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Comment;
