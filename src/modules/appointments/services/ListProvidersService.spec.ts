import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers, but not itself', async () => {
    const userOne = await fakeUsersRepository.create({
      email: 'email@email',
      name: 'name',
      password: 'password',
    });

    const userTwo = await fakeUsersRepository.create({
      email: 'email2@email',
      name: 'name',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'email3@email',
      name: 'name',
      password: 'password',
    });

    const users = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(users).toEqual([userOne, userTwo]);
  });

  it('should be able to list the providers, including itself', async () => {
    const userOne = await fakeUsersRepository.create({
      email: 'email@email',
      name: 'name',
      password: 'password',
    });

    const userTwo = await fakeUsersRepository.create({
      email: 'email2@email',
      name: 'name',
      password: 'password',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'email3@email',
      name: 'name',
      password: 'password',
    });

    const users = await listProviders.execute({ user_id: '' });

    expect(users).toEqual([userOne, userTwo, loggedUser]);
  });
});
