import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async get(userId) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }
  async update(userId, dto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const updatedHash = await argon.hash(dto.password);
    const updData: any = {
      name: dto.name,
      email: dto.email,
    };
    if (dto.password !== '') updData.hash = updatedHash;

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updData,
    });
  }
}
