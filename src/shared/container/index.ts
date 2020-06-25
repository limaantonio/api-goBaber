import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import IAppoitmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppoitmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepositoriy';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppoitmentsRespository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationRepository',
  NotificationRepository,
);
