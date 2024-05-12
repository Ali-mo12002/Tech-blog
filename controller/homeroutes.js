const router = require('express').Router();
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

// GET signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
