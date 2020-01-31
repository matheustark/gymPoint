import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlansController from './app/controllers/PlanControllers';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrdersController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/students/:student_id/checkin', CheckinController.store);
routes.get('/students/:student_id/checkin', CheckinController.index);

routes.post('/students/:student_id/help_order', HelpOrderController.store);
routes.get('/students/:student_id/help_order', HelpOrderController.show);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/registration/:student_id', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.put('/registration/:registration_id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

routes.get('/help_order', HelpOrderController.index);
routes.post('/help_order/:help_order_id/answer', AnswerController.store);

module.exports = routes;
