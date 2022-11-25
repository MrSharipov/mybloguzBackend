import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { UserUpdateDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@GetUser('id') userId) {
    return this.usersService.get(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() dto: UserUpdateDto, @GetUser('id') userId: number) {
    return this.usersService.update(userId, dto);
  }
}
