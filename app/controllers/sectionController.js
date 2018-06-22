const {
  Project,
  Section,
} = require('../models');

module.exports = {
  async add(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Preencha com um título da seção');
        return res.redirect('back');
      }
      const section = await Section.create({
        ...req.body,
        ProjectId: req.params.id,
      });
      req.flash('sucess', 'Seção criada com sucesso');
      return res.redirect(`/app/projects/${req.params.id}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const {
        projectId,
        id,
      } = req.params;
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: projectId,
        },
      });
      const project = await Project.findById(projectId);
      const section = await Section.findById(id);
      return res.render('sections/show', {
        User: req.session.user.name,
        section,
        sections,
        project,
        activeId: id,
        projectId,
      });
    } catch (err) {
      return next(err);
    }
  },
};
