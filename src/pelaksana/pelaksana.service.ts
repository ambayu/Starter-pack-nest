import { Injectable } from '@nestjs/common';
import { CreatePelaksanaDto } from './dto/create-pelaksana.dto';
import { UpdatePelaksanaDto } from './dto/update-pelaksana.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PelaksanaService {
  constructor(private prisma: PrismaService) {}
  create(createPelaksanaDto: CreatePelaksanaDto) {
    return 'This action adds a new pelaksana';
  }

  async findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string,
    order?: string,
  ) {
    const skip = (page - 1) * perPage;

    const where: any = {};
    if (search) {
      where.OR = [{ nama: { contains: search } }];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.pelaksana.findMany({
        skip,
        take: perPage,
        where,
        orderBy: {
          [orderBy ? orderBy : 'createdAt']: order,
        },
      }),
      this.prisma.pelaksana.count({ where }),
    ]);

    return successResponse('Pelaksana ditemukan', {
      data,
      total,
      page,
      perPage,
      orderBy,
      order,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} pelaksana`;
  }

  update(id: number, updatePelaksanaDto: UpdatePelaksanaDto) {
    return `This action updates a #${id} pelaksana`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelaksana`;
  }
}
