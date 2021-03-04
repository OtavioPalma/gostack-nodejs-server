import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'email@email',
      name: 'name',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('email@email');
    expect(user.name).toBe('name');
  });

  it('should not be able to create a new user with an email that already exists', async () => {
    await createUser.execute({
      email: 'email@email',
      name: 'name',
      password: 'password',
    });

    await expect(
      createUser.execute({
        email: 'email@email',
        name: 'name',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
