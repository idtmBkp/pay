const { Project, Section } = require('../models');

module.exports = {
  async add(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Preencha com um título do projeto');
        return res.redirect('/app/dashboard');
      }
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });
      req.flash('sucess', 'Categoria criada com sucesso');
      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: req.params.id,
        },
      });
      const project = await Project.findById(req.params.id);
      return res.render('projects/show', {
        User: req.session.user.name,
        sections,
        activeProjectId: req.params.id,
        project,
      });
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Project.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
  async newSection(req, res, next) {
    try {
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: req.params.id,
        },
      });
      const project = await Project.findById(req.params.id);
      return res.render('sections/novo', {
        User: req.session.user.name,
        sections,
        activeProjectId: req.params.id,
        project,
      });
    } catch (err) {
      return next(err);
    }
  },
};
