function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: 'You need to be logged in to see this' });
  }
}

module.exports = {
  isLoggedIn
};
