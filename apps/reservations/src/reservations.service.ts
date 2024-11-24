import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENT_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.paymentService
      .send('create_charge', {
        ...createReservationDto.charge,
        email: user.email,
      })
      .pipe(
        map(async (res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId: user._id,
            invoiceId: res.id,
          });
        }),
      );
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({
      _id,
    });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({
      _id,
    });
  }
}
