import { Injectable } from '@nestjs/common';
import { MailServerService } from './modules/mail-server/mail-server.service';

@Injectable()
export class AppService {
  constructor(private readonly mailServerService: MailServerService) {}
  getHello(): Promise<string> {
    return this.mailServerService.sendEmail({
      to: 'test@nestjs.com',
      subject: 'Por favor, confirme sua conta',
      // template: 'receipt-orders',
      data: {
        htmlTitle: 'Confirmação da conta',
        header: 'Confirme seu  e-mail',
        text: 'Clique no botão abaixo para confirmar seu endereço de e-mail, para começar a usufruir de nossos produtos. Seu link é válido por 1h.',
        // addText: 'Bjos, Context.',
        c2a_link: `${process.env.FRONT_URL}/token-confirm-email`,
        c2a_button: 'Ativar conta',
      },
    });
  }
}
