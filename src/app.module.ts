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
import { ItemKegiatanAsbModule } from './item-kegiatan-asb/item-kegiatan-asb.module';
import { KelompokHspkModule } from './kelompok-hspk/kelompok-hspk.module';
import { KegiatanHspkModule } from './kegiatan-hspk/kegiatan-hspk.module';
import { SubKegiatanHspkModule } from './sub-kegiatan-hspk/sub-kegiatan-hspk.module';
import { ItemKegiatanHspkModule } from './item-kegiatan-hspk/item-kegiatan-hspk.module';
import { KomponenHspkModule } from './komponen-hspk/komponen-hspk.module';

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
    ItemKegiatanAsbModule,
    KelompokHspkModule,
    KegiatanHspkModule,
    SubKegiatanHspkModule,
    ItemKegiatanHspkModule,
    KomponenHspkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
