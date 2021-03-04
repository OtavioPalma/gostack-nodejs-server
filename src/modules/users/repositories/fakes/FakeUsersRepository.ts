import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async findAllProviders({
    excluded_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    const users = [...this.users];

    if (excluded_id) {
      return users.filter(user => user.id !== excluded_id);
    }

    return users;
  }

  public async save(userData: User): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === userData.id);

    this.users[userIndex] = userData;

    return userData;
  }
}

export default FakeUsersRepository;
