import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (candidate)
      throw new HttpException(
        {
          message: 'User with such email already exists',
          code: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.SALTROUNDS!),
    );
    const createdUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    if (!createdUser) {
      throw new HttpException(
        {
          message: 'Error while creating user',
          code: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    if (!users) {
      throw new HttpException(
        { message: 'Users not found', code: 'USERS_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException(
        { message: 'User not found', code: 'USER_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user)
      throw new HttpException(
        { message: 'No user found with such id', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const updatedUserData = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return updatedUserData;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user)
      throw new HttpException(
        { message: 'No user found with such id', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const deletedUser = await this.prisma.user.delete({ where: { id } });
    return deletedUser;
  }
}
