import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notication from '../schemas/Notification';

class NoticationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notication>;

  constructor() {
    this.ormRepository = getMongoRepository(Notication, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notication> {
    const notication = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notication);

    return notication;
  }
}

export default NoticationsRepository;
