import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlansController from './app/controllers/PlanControllers';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

module.exports = routes;
