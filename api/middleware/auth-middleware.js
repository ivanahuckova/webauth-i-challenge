function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: 'You need to be logged in to see this' });
  }
}

function authorizedForRestricted(req, res, next) {
  if (req.url.includes('/api/restricted')) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(400).json({ message: 'You need to be logged in to see this' });
    }
  } else {
    next();
  }
}

module.exports = {
  isLoggedIn,
  authorizedForRestricted
};
