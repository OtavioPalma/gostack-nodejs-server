import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const cacheKey = `providers-list:${user_id}`;

    let users = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        excluded_id: user_id,
      });

      await this.cacheProvider.save<User[]>(cacheKey, users);
    }

    return users;
  }
}

export default ListProvidersService;
