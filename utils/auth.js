const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    req.user = { id: req.session.user_id };
    next();
  }
};
module.exports = withAuth;
