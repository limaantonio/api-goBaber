import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPassword from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/HashProvider';

let fakeUserRepository: FakeUserRepository;

let fakeUserTokesRepository: FakeUserTokensRepository;
let resetPassword: ResetPassword;
let fakeHashProvider: FakeHashProvider;

describe('ResetePasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokesRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPassword(
      fakeUserRepository,
      fakeUserTokesRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokesRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokesRepository.generate(
      'non-exisiting-user',
    );
    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokesRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
