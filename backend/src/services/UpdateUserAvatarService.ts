import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'; // node file system
import uploadConfig from '../config/upload';

// import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string; // uuid
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id); // validating user

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
      // throw new AppError('Only authenticated users can change avatar', 401);
    }

    // delete previous avatar
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // if user exists, update it
    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user; // this is what returns from Promise<>
  }
}

export default UpdateUserAvatarService;
