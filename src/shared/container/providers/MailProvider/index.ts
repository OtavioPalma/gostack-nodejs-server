import mailConfig from '@config/mail';
import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
