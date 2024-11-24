import { CreateChargeDto } from '@app/common';
import { IsString } from 'class-validator';

export class PaymentCreateChargeDto extends CreateChargeDto {
  @IsString()
  email: string;
}
