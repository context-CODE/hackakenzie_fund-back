import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailServerService } from './mail-server.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

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
      defaults: {
        from: '"No Reply" hackakenzie.project@gmail.com',
      },
      preview: true,
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: join(__dirname, 'templates', 'partials'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
})
export class MailServerModule {}
