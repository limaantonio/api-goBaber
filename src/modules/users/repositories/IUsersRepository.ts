import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserCreateDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProviderDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProvider(data: IFindAllProvidersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
