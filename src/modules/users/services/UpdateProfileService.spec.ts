import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'new_name',
      email: 'new_email@new_email.com',
    });

    expect(updatedUser.name).toBe('new_name');
    expect(updatedUser.email).toBe('new_email@new_email.com');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'name',
        email: 'email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    const user = await fakeUsersRepository.create({
      name: 'another_name',
      email: 'another_email@another_email.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'another_name',
        email: 'email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'name',
      email: 'email@email.com',
      old_password: 'password',
      password: 'new_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'name',
        email: 'email@email.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'name',
        email: 'email@email.com',
        old_password: 'wrong_password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
