import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig); // this upload is a multer instance, therefore contains methods

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  // instantiate the imported CreateUserService
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // delete password from db visibility
  delete user.password;

  // i return the band new created user as a json, becaus is a body request
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated, // first middleware
  upload.single('avatar'), // second middleware
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
