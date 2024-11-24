import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dtos/notify-email.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    return this.notificationService.notifyEmail(data);
  }
}
