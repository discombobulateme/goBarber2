import { getRepository } from 'typeorm'; // as this repo has no specific rule, we can use this default
import { hash } from 'bcryptjs'; // import hash function from crypto library

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // 1st I look for it in my repository
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    // I validate if it already exists, or not. If it does, send error
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    // add crypto to password using imported hash fuunction
    const hashedPassword = await hash(password, 8); // crypto number

    // if not, create new user
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // and save new user
    await usersRepository.save(user);

    // and, of course, return new user
    return user;
  }
}

export default CreateUserService;
