import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const plans = await Plan.findAll({
      order: ['duration'],
      limit: 20,
      offset: (page - 1) * 20
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const checkPlans = await Plan.findOne({
      where: { title: req.body.title }
    });

    if (checkPlans) {
      return res.status(400).json({ error: 'Plan alredy exists' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const plan = await Plan.findByPk(req.body.id);

    if (!plan)
      return res.status(400).json({ error: "This plan doesn't exist!" });

    const { title } = req.body;
    if (title && title !== plan.title) {
      const invalidPlan = await Plan.findOne({ where: { title } });
      if (invalidPlan)
        return res
          .status(400)
          .json({ error: 'This plan is already registred!' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plans = await Plan.destroy({
      where: { id: req.params.id }
    });
    if (!plans)
      return res.status(400).json({ error: 'This plan dosent exists!' });

    return res.json({ message: 'Plan deleted!' });
  }
}

export default new PlanController();
