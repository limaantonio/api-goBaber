import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/HashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'erropassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
