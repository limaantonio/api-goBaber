import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    await expect(profile.name).toBe('John Doe');
    await expect(profile.email).toBe('john@gmail.com');
  });

  it('should not be able to show the profile non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
