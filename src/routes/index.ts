import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) =>
  res.json({ msg: 'Olá mundo!!!', user: 'Marcus Botelho' }),
);

export default routes;
