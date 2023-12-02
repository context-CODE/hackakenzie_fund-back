import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IMailProps, IProductsMail } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailServerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mailProps: IMailProps): Promise<string> {
    return await this.mailerService
      .sendMail({
        to: mailProps.to,
        subject: mailProps.subject,
        template: mailProps.template ?? 'base',
        context: {
          baseUrl: process.env.FRONT_URL,
          value: mailProps.data,
        },
      })
      .then(() => 'Email sent successfully')
      .catch((err) => {
        console.log(err);

        throw new InternalServerErrorException(
          'error sending email, try again later',
        );
      });
  }

  confirmationEmailTemplate(confirmationToken: string, email: string) {
    const template = {
      to: email,
      subject: 'Por favor, confirme sua conta',
      data: {
        htmlTitle: 'Confirmação da conta',
        header: 'Confirme seu  e-mail',
        text: 'Clique no botão abaixo para confirmar seu endereço de e-mail, para começar a usufruir de nossos produtos. Seu link é válido por 1h.',
        c2a_link: `${process.env.FRONT_URL}/confirm_email/${confirmationToken}`,
        c2a_button: 'Ativar conta',
      },
    };

    return template;
  }

  resetPasswordTemplate(resetToken: string, email: string) {
    const template = {
      to: email,
      subject: 'Esqueceu a senha?',
      data: {
        htmlTitle: 'Redefinição de senha',
        header: 'Redefina sua senha',
        text: 'Você recebeu este e-mail porque foi enviado um pedido de redefinição de senha para sua conta. Não esqueça, esse link é válido somente por 1h. Clique no botão abaixo para para atualizar a sua senha:',
        c2a_link: `${process.env.FRONT_URL}/reset_password/${resetToken}`,
        c2a_button: 'Redefinir senha',
      },
    };

    return template;
  }

  notificationLowStockTemplate(
    products: IProductsMail[],
    to: string | string[],
  ) {
    const template = {
      to,
      subject: 'Alerta de estoque',
      template: 'stock-notification',
      data: {
        htmlTitle: 'Notificação de estoque',
        header: 'Produtos com estoque baixo',
        text: 'O(s) seguinte(s) produto(s) já atingiram o limite mínimo de unidades:',
        products,
      },
    };

    return template;
  }

  notificationOutStockTemplate(
    products: IProductsMail[],
    to: string | string[],
  ) {
    const template = {
      to,
      subject: 'Alerta de estoque',
      template: 'stock-notification',
      data: {
        htmlTitle: 'Notificação de estoque',
        header: 'Produtos sem estoque',
        text: 'Está na hora de repôr o(s) seguinte(s) produto(s):',
        products,
      },
    };

    return template;
  }
}
