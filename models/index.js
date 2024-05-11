const User = require('./user');
const Post = require('./post');
const Comment = require('./comments');

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

module.exports = { User , Post ,Comment};
