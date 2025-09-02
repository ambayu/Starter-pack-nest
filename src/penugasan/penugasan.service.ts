import { Injectable } from '@nestjs/common';
import { CreatePenugasanDto } from './dto/create-penugasan.dto';
import { UpdatePenugasanDto } from './dto/update-penugasan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { successResponse } from 'src/utils/response.util';

@Injectable()
export class PenugasanService {
  constructor(private prisma: PrismaService) { }
  async create(data: CreatePenugasanDto) {
    return "";
  }



  findAll() {
    return `This action returns all penugasan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} penugasan`;
  }

  update(id: number, data: UpdatePenugasanDto) {
    return `This action updates a #${id} penugasan`;
  }

  remove(id: number) {
    return `This action removes a #${id} penugasan`;
  }
}
