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
    }
  },
};
