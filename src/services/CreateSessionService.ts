import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrect email/password combination');
    }

    const matchingPasswords = await compare(password, user.password);

    if (!matchingPasswords) {
      throw Error('Incorrect email/password combination');
    }

    return { user };
  }
}

export default CreateSessionService;