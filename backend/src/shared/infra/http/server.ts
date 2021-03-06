import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors()); // avoid untrustful sites to access our app, only for browser
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes); // use = use ir as a middleware

// this is an error handler (tratativa) middleware
// it will check our route errors, therefore HAS to come after the routes
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // if it is an error generated by my application, that I know of
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // to help me debug
  console.error(err);

  // if it's an unknown error, at least I send a nice message to frontend
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
},
);

app.listen(3333, () => {
  console.log('🍳 Server started on port 3333');
});
