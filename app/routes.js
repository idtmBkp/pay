const express = require('express');

const routes = express.Router();
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});
routes.use('/app', authMiddleware);

// AUTH

routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

// DASHBOARD
routes.get('/app/dashboard', dashboardController.index);

// PROJECTS

routes.post('/app/projects/add', projectController.add);
routes.get('/app/projects/:id', projectController.show);
routes.get('/app/projects/destroy/:id', projectController.destroy);

// SECTIONS=======
routes.get('/app/projects/:id/sections/new', projectController.newSection);
routes.post('/app/projects/:id/sections/add', sectionController.add);
routes.get('/app/projects/:projectId/sections/:id', sectionController.show);

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
