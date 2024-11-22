import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@CurrentUser() user: UserDocument) {
    return user;
  }
}
