import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '../repositories/IUsersRepository';
// import User from '../infra/typeorm/entities/User';
import IUserTokensRespository from '../repositories/IUserTokensRepositoriy';
import IHashprovider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRespository,

    @inject('HashProvider')
    private hashProvider: IHashprovider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User token does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
