import * as Yup from 'yup';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation fails' });

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({
        error: 'Student invalid!'
      });
    }

    const chekins = await Checkin.findAll({ where: { student_id } });

    return res.json(chekins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validation fails' });

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({
        error: 'Student invalid!'
      });
    }

    const today = Number(new Date());
    const startDate = Number(subDays(today, 7));
    const lastCheckins = await Checkin.findAll({
      where: {
        student_id,
        created_at: { [Op.between]: [startOfDay(startDate), endOfDay(today)] }
      }
    });

    if (lastCheckins && lastCheckins.length >= 5)
      return res
        .status(401)
        .json({ error: 'You canot check more of 5 times in a week!' });

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
