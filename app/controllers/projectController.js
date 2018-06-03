const { Project, Section } = require('../models');

module.exports = {
  async add(req, res, next) {
    try {
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
        where: {
          ProjectId: req.params.id,
        },
      });
      return res.render('projects/show', {
        User: req.session.user.name,
        sections,
        activeId: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  },
};
