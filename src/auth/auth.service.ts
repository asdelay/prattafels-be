import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateTokens } from './heplers/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
    });

    if (!user)
      throw new HttpException(
        {
          message: `User with email ${loginDto.email} doesn't exist!`,
          status: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
      );

    const isPassEqual = await bcrypt.compare(loginDto.password, user.password);

    if (!isPassEqual)
      throw new HttpException(
        { message: 'Wrong password or email', status: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const { accessToken, refreshToken } = generateTokens({
      email: loginDto.email,
      fullName: user.fullName,
    });

    const userData = await this.prisma.user.update({
      where: { email: user.email },
      data: { refreshToken },
    });

    return { accessToken, refreshToken: userData.refreshToken };
  }
  async register(registerDto: RegisterDto) {
    const candidate = await this.prisma.user.findFirst({
      where: { email: registerDto.email },
    });

    if (candidate)
      throw new HttpException(
        {
          message: `User with email ${registerDto.email} already exist!`,
          status: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
      );

    const hashedPass = await bcrypt.hash(
      registerDto.password,
      Number(process.env.SALTROUNDS!),
    );

    const { accessToken, refreshToken } = generateTokens({
      email: registerDto.email,
      fullName: registerDto.fullName,
    });

    const user = await this.prisma.user.create({
      data: { ...registerDto, password: hashedPass, refreshToken },
    });

    return { accessToken, refreshToken: user.refreshToken };
  }
}
