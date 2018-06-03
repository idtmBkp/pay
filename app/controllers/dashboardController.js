module.exports = {
  index(req, res) {
    return res.render('dashboard/index', { User: req.session.user.name });
  },
};
