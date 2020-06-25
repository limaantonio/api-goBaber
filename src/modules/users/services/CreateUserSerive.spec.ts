import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProviders';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/HashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email form another', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
