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
  UseGuards,
} from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { CreateBiodataDto } from './dto/create-biodata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { updateBiodataDto } from './dto/update-biodata.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { Permissions } from 'src/common/decorators/permission.decorator';

@Controller('biodata')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class BiodataController {
  constructor(private readonly biodataService: BiodataService) { }

  // GET ALL
  @Get()
  @Permissions('biodata:view')
  findAll() {
    return this.biodataService.findAll();
  }

  // GET BY ID
  @Get(':id')
  @Permissions('biodata:view')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.biodataService.findById(id);
  }

  // CREATE
  @Post()
  @Permissions('biodata:create')
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
  @Permissions('biodata:edit')
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
  @Permissions('biodata:delete')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return this.biodataService.destroy(id);
  }
}
