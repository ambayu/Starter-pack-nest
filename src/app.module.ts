import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BiodataModule } from './biodata/biodata.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { AuthModule } from './auth/auth.module';
import { SatuanModule } from './satuan/satuan.module';
import { KegiatanAsbModule } from './kegiatan-asb/kegiatan-asb.module';
import { KomponenAsbModule } from './komponen-asb/komponen-asb.module';
import { SubKegiatanAsbModule } from './sub-kegiatan-asb/sub-kegiatan-asb.module';
import { KelompokAsbModule } from './kelompok-asb/kelompok-asb.module';

@Module({
  imports: [
    UserModule,
    BiodataModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
    RolePermissionModule,
    AuthModule,
    SatuanModule,
    KegiatanAsbModule,
    KomponenAsbModule,
    SubKegiatanAsbModule,
    KelompokAsbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
