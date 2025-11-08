import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfficesService {
  constructor(private prisma: PrismaService) {}
  async create(createOfficeDto: CreateOfficeDto) {
    const newOffice = await this.prisma.office.create({
      data: {
        ...createOfficeDto,
      },
    });

    return newOffice;
  }

  async findAll() {
    const allOffices = await this.prisma.office.findMany();
    return allOffices;
  }

  async findOne(id: number) {
    const officeById = await this.prisma.office.findFirst({ where: { id } });

    if (!officeById)
      throw new HttpException(
        { message: 'No office found with such id', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );
    return officeById;
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    const candidateOffice = await this.prisma.office.findFirst({
      where: { id },
    });

    if (!candidateOffice)
      throw new HttpException(
        { message: 'No office found with such id', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const updatedOffice = await this.prisma.office.update({
      where: {
        id,
      },
      data: { ...updateOfficeDto },
    });

    if (!updatedOffice)
      throw new HttpException(
        { message: 'Error while updating office data', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    return updatedOffice;
  }

  async remove(id: number) {
    const candidateOffice = await this.prisma.office.findFirst({
      where: { id },
    });

    if (!candidateOffice)
      throw new HttpException(
        { message: 'No office found with such id', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const deletedOfficeData = await this.prisma.office.delete({
      where: { id },
    });

    return deletedOfficeData;
  }
}
