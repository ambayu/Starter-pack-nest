import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { JenisPenugasanService } from './jenis-penugasan.service';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { CreateJenisPenugasanDto } from './dto/create-jenis-penugasan.dto';
import { UpdateJenisPenugasanDto } from './dto/update-jenis-penugasan.dto';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@UseGuards(JwtAuthGuard, PermissionGuard) // default semua endpoint cek JWT + permission
@Controller('jenis-penugasan')
export class JenisPenugasanController {
  constructor(private readonly jenisPenugasanService: JenisPenugasanService) { }

  @Post()
  create(
    @Body() createJenisPenugasanDto: CreateJenisPenugasanDto,
    @Req() req: any,
  ) {
    return this.jenisPenugasanService.create({
      ...createJenisPenugasanDto,
      createdBy: Number(req.user.id),
    });
  }




  @Post('penomoran/:id')
  Penomoran(@Param('id') id: number,
    @Body('nomor_penugasan') nomor_penugasan: string) {
    return this.jenisPenugasanService.penomoran(id, nomor_penugasan);
  }

  @Post('changeStatus-JenisPenugasaan/:id/:id_status')
  changeStatus_JenisPenugasaan(
    @Param('id') id: number,
    @Param('id_status') id_status: number,
  ) {
    return this.jenisPenugasanService.changeStatus_JenisPenugasaan(
      id,
      id_status,
    );
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
  ) {
    return this.jenisPenugasanService.findAll(
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
    );
  }

  @Get('user')
  findAllByUser(
    @Req() req: any,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
    @Query('type') type?: string,
  ) {
    return this.jenisPenugasanService.findAllByUser(
      req.user.nip,
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
      type,
    );
  }

  @Get('user-penandatanganan')
  findAllUserPenandatanganan(
    @Req() req: any,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
  ) {
    return this.jenisPenugasanService.findAllUserPenandatanganan(
      req.user.id,
      Number(page) || 1,
      Number(perPage) || 10,
      search,
      orderBy,
      order,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisPenugasanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJenisPenugasanDto: UpdateJenisPenugasanDto,
  ) {
    return this.jenisPenugasanService.update(+id, updateJenisPenugasanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisPenugasanService.remove(+id);
  }
  @Post('reject-penugasan/:id')
  rejectPenugasan(@Param('id') id: number,
    @Body('alasan') alasan: string,) {
    return this.jenisPenugasanService.reject_penugasan(id, alasan);

  }

  @Post('reject-penugasan-st/:id')
  rejectPenugasanSt(@Param('id') id: number,
    @Body('alasan') alasan: string,) {
    return this.jenisPenugasanService.reject_penugasanst(id, alasan);

  }

  @Post('approve-penugasan/:id')
  approvePenugasan(@Param('id') id: number,
    @Body('id_status') id_status: number
  ) {
    return this.jenisPenugasanService.approve_penugasan(id, id_status || 5);
  }
  // ====== Tambahan Endpoint Approve / Reject TTD ======
  @Post('approve-ttd/:type/:id')
  approveTTD(
    @Param('type') type: 'km1' | 'km2' | 'km3' | 'km4',
    @Param('id') id: number,
    @Body('ttd') ttd: string,
    @Req() req: any,
  ) {
    return this.jenisPenugasanService.approve_ttd(
      type,
      Number(id),
      ttd,
      req.user.id,
    );
  }

  @Post('reject-ttd/:type/:id')

  rejectTTD(
    @Param('type') type: 'km1' | 'km2' | 'km3' | 'km4',
    @Param('id') id: number,
    @Body('ttd') ttd: string,
    @Body('alasan') alasan: string,
  ) {
    return this.jenisPenugasanService.reject_ttd(
      type,
      Number(id),
      ttd,
      alasan,
    );
  }

  @Get('download-penomoran/:id')
  async downloadPDF(@Param('id') id: number, @Res() res: Response) {
    const buffer = await this.jenisPenugasanService.generatePdf(Number(id));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=penugasan-${id}.pdf`);
    res.setHeader('Content-Length', buffer.length);

    res.end(buffer);
  }


  @Post('upload-st/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/st', // folder penyimpanan
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `st-${req.params.id}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
          return cb(
            new BadRequestException('Hanya file PDF atau Word yang diperbolehkan!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    }),
  )
  async uploadST(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }

    return this.jenisPenugasanService.saveUploadST(Number(id), file.filename);
  }


  @Get('download-st/:id')
  async downloadST(@Param('id') id: number, @Res() res: Response) {
    const file = await this.jenisPenugasanService.downloadST(Number(id));

    res.download(file.filePath, file.filename); // download PDF langsung
  }



}
