const { Comment, User } = require('../../models'); 
const router = require('express').Router();
const withAuth = require('../../utils/auth')
// Get all comments for a post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Interssnal server error' });
  }
});

// Create a new comment for a post
router.post('/:postId',withAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    req.body.post_id = postId
    const userId = req.user.id
    req.body.user_id = userId
    const newComment = await Comment.create({
      ...req.body,
      userId
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Delete a comment
router.delete('/:commentId', withAuth, async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal sserver error' });
  }
});

module.exports = router;
