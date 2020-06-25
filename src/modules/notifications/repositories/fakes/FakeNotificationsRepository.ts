import { ObjectId } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

class NoticationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notication = new Notification();

    Object.assign(notication, { id: new ObjectId(), content, recipient_id });

    this.notifications.push(notication);

    return notication;
  }
}

export default NoticationsRepository;
