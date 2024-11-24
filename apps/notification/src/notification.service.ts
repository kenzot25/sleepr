import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dtos/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
      accessToken: this.configService.get('GOOGLE_OAUTH_ACCESS_TOKEN'),
    },
  });
  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transport.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleepr Notification',
      text,
    });
  }
}
