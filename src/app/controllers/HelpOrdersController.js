import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrders';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null }
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
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
    const helpOrder = await HelpOrder.findAll({ where: { student_id } });

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({
        error: 'Student invalid!'
      });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({ student_id, question });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
