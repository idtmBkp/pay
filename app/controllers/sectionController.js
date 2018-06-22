<<<<<<< HEAD
const { Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;
      const section = await Section.findById(id);
      const project = await Project.findById(projectId);
      const sections = await Section.findAll({
        where: {
          ProjectId: projectId,
        },
      });
      res.render('sections/show', {
        section,
        project,
        sections,
        activeProjectId: projectId,
        activeSection: id,
      });
    } catch (err) {
      next(err);
=======
const { Section } = require('../models');

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
>>>>>>> c5e52b94cec5a10fe6afd86bb07701a2e005e53e
    }
  },
};
