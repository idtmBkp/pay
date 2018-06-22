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
    }
  },
};
