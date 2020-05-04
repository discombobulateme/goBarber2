import { Router } from 'express';

import appointmetnsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// use allows me to not repeat the path when creating a route in other fiels
routes.use('/appointments', appointmetnsRouter);
routes.use('/users', usersRouter);

export default routes;
