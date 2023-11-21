import { Module } from '@nestjs/common';
import { MailServerService } from './mail-server.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [MailServerService],
  exports: [MailServerService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new PugAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
})
export class MailServerModule {}
