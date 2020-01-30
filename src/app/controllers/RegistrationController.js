import * as Yup from 'yup';
import { parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll({
      order: ['id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title']
        }
      ]
    });

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id } = req.params;
    const { plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({
        error: "This student dosen't exists!"
      });
    }

    const registeredStudent = await Registration.findOne({
      where: { student_id }
    });

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({
        error: "This plan dosen't exists!"
      });
    }

    if (registeredStudent) {
      return res.status(401).json({
        error: 'This Student aready registered'
      });
    }

    const formatDate = parseISO(start_date);

    if (isBefore(formatDate, new Date())) {
      return res.status(400).json({ error: 'Invalid start date!' });
    }

    const end_date = addMonths(formatDate, plan.duration);
    const price = plan.duration * plan.price;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { registration_id } = req.params;
    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({
        error: "This plan dosen't exists!"
      });
    }

    const formatDate = parseISO(start_date);

    if (isBefore(formatDate, new Date())) {
      return res.status(400).json({ error: 'Invalid start date!' });
    }

    const end_date = addMonths(formatDate, plan.duration);
    const price = plan.duration * plan.price;
    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      return res.status(400).json({
        error: "This registration dosen't exists!"
      });
    }

    return res.json(
      await registration.update({ plan_id, start_date, end_date, price })
    );
  }

  async delete(req, res) {
    const register = await Registration.destroy({
      where: { id: req.params.id }
    });

    if (!register)
      return res.status(400).json({ error: 'This register not exists!' });

    return res.json({ message: 'Registration deleted' });
  }
}

export default new RegistrationController();
