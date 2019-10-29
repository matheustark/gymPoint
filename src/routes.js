import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/students', StudentController.store);
routes.post('/session', SessionController.store);

module.exports = routes;
