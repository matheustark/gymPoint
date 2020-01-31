import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrders';
import Student from '../models/Student';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { help_order_id } = req.params;

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        }
      ]
    });

    if (!helpOrder || helpOrder.answer_at !== null)
      return res
        .status(400)
        .json({ error: 'Invalid help order or its already answered!' });

    await helpOrder.update({
      answer,
      answer_at: new Date()
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
