import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { CreateBiodataDto } from './dto/create-biodata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { updateBiodataDto } from './dto/update-biodata.dto';

@Controller('biodata')
export class BiodataController {
  constructor(private readonly biodataService: BiodataService) { }

  // GET ALL
  @Get()
  findAll() {
    return this.biodataService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.biodataService.findById(id);
  }

  // CREATE
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/photos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `photo-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() body: CreateBiodataDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file?.filename) {
      body.photo = file.filename;
    }
    return this.biodataService.create(body);
  }

  // UPDATE
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/photos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `photo-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateBiodataDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file?.filename) {
      body.photo = file.filename;
    }
    return this.biodataService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return this.biodataService.destroy(id);
  }
}
