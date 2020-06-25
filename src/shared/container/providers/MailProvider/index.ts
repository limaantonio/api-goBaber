import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';

import EthereailMailProvider from './implementations/EthereailMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EthereailMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
