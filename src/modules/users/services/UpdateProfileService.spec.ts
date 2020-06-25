import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/HashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria',
      email: 'maria@gmail.com',
    });

    await expect(updatedUser.name).toBe('Maria');
    await expect(updatedUser.email).toBe('maria@gmail.com');
  });

  it('should not be able to update the profile non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user_id',
        name: 'test',
        email: 'tes@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not  be able to change the another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '1235',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'test',
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria',
      email: 'maria@gmail.com',
      old_password: '1235',
      password: '123123',
    });

    await expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Maria',
        email: 'maria@gmail.com',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1235',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Maria',
        email: 'maria@gmail.com',
        old_password: 'wrog old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
