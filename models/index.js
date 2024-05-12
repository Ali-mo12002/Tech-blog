const User = require('./user');
const Post = require('./post');
const Comment = require('./comments');

Post.belongsTo(User, { foreignKey: 'userId'});
User.hasMany(Post, { foreignKey: 'userId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

module.exports = { User , Post ,Comment};
