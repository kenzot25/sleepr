import { NOTIFICATION_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dtos/payment-create-charge.dto';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-11-20.acacia',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    this.notificationService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully.`,
    });
    return paymentIntent;
  }
}
