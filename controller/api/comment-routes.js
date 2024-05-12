const { Comment } = require('../../models'); 
const router = express.Router();
const withAuth = require('../../utils/auth')
// Get all comments for a post
router.get('/:postId', withAuth, async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { postId } });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new comment for a post
router.post('/:postId', withAuth, async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  try {
    const newComment = await Comment.create({ text, postId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
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
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
