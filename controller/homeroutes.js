const router = require('express').Router();
const session = require('express-session');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass the serialized data to the homepage template
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn // Pass whether the user is logged in to the template
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET login form
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
   
    const userId = req.user.id; // Make sure this line is extracting the correct ID
    console.log('Fetching posts for user ID:', userId); // Debugging
    console.log('Fetching posts for user ID:', userId); // Debug logging
    const userPosts = await Post.findAll({
      where: { user_id: userId },
    });

    console.log('Fetched posts:', userPosts); // Debug logging
    res.render('dashboard', {
      userPosts,
      loggedIn: req.session.loggedIn // Pass whether the user is logged in to the template
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
