import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_REFRESH_TOkEN: Joi.string().required(),
        GOOGLE_OAUTH_ACCESS_TOKEN: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
      }),
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
