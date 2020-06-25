// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProviders';
import ListProvidersService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the profile', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Maria',
      email: 'maria@gmail.com',
      password: '1235',
    });
    const loggerdUser = await fakeUserRepository.create({
      name: 'Mary',
      email: 'mar@gmail.com',
      password: '1235',
    });

    const providers = await listProviders.execute({
      user_id: loggerdUser.id,
    });

    await expect(providers).toEqual([user1, user2]);
  });
});
