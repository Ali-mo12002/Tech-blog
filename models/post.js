const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init(
    {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}
);


module.exports = Post;
