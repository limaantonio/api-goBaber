import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMainProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokesRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgonPassworEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokesRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokesRepository,
    );
  });
  it('should be able to recover the password unsing the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12233',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokesRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12233',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
