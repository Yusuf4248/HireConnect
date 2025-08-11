import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST') || 'smtp.gmail.com',
          secure: false,
          auth: {
            user:
              config.get<string>('EMAIL_USER') || 'sevarahalilova28@gmail.com',
            pass: config.get<string>('EMAIL_PASS') || 'ssbhilyrhjmqiihm',
          },
        },
        defaults: {
          from: `"Skidkachi" <${config.get<string>('ACTIVATION_BASE_URL')}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
