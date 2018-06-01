const express = require('express');

const routes = express.Router();
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});
routes.use('/app', authMiddleware);

routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);
routes.get('/app/dashboard', dashboardController.index);

// 404
routes.use((req, res) => res.render('error/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('error/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
