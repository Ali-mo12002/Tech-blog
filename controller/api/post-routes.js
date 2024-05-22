const { Post, User } = require('../../models'); 
const router = require('express').Router();
const withAuth = require('../../utils/auth'); 
// Get all posts
router.get('/',  async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/userposts', withAuth, async (req, res) => {
  try {
    const userId = req.user.id || req.session.user_id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is not defined' });
    }

    const userPosts = await Post.findAll({
      where: { user_id: userId },
    });

    res.json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.user.id, 
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a post
router.delete('/:id',  async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;