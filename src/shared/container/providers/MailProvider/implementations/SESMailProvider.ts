import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import mailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTempalteProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'eu-west-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    try {
      await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTempalteProvider.parse(templateData),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
