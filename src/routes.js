import { Router } from 'express';

import Student from './app/models/Student';

const routes = new Router();

routes.get('/', async (req, res) => {
  const student = await Student.create({
    name: 'Matheus Gonçalves',
    email: 'matheustark321@gmail.com',
    age: 23,
    weight: 70,
    height: 1.84
  });

  return res.json(student);
});

module.exports = routes;
