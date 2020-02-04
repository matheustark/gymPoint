import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const registration = data.createRegistration;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Matrícula realizada',
      template: 'registration',
      context: {
        student: registration.student.name,
        registration: registration.id,
        name: registration.student.name,
        plan: registration.plan.title,
        price: registration.price,
        end_date: format(parseISO(registration.end_date), "dd'/'MM'/'yyyy")
      }
    });
  }
}

export default new RegistrationMail();
