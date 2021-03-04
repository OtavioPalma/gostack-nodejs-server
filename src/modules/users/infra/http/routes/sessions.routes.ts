import CreateSessionService from '@modules/users/services/CreateSessionService';
import { Router } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createSession = new CreateSessionService(usersRepository);

  const { user, token } = await createSession.execute({
    email,
    password,
  });

  return response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar,
    },
    token,
  });
});

export default sessionsRouter;
