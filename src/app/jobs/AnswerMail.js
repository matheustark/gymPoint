import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const answer = data.helpOrder;

    console.log('answer', answer);

    await Mail.sendMail({
      to: `${answer.student.name} <${answer.student.email}>`,
      subject: 'Resposta do Professor',
      template: 'answer',
      context: {
        student: answer.student.name,
        question: answer.question,
        answer: answer.answer
      }
    });
  }
}

export default new AnswerMail();
