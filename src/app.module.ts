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
import { PeraturanTahunanModule } from './peraturan-tahunan/peraturan-tahunan.module';
import { KategoriKomponenModule } from './kategori-komponen/kategori-komponen.module';
import { SatuanModule } from './satuan/satuan.module';
import { HargaReferensiModule } from './harga-referensi/harga-referensi.module';
import { KegiatanAsbModule } from './kegiatan-asb/kegiatan-asb.module';
import { KomponenAsbModule } from './komponen-asb/komponen-asb.module';

@Module({
  imports: [UserModule, BiodataModule, RoleModule, UserRoleModule, PermissionModule, RolePermissionModule, AuthModule, PeraturanTahunanModule, KategoriKomponenModule, SatuanModule, HargaReferensiModule, KegiatanAsbModule, KomponenAsbModule],
  controllers: [AppController],
  providers: [AppService,],
})

export class AppModule { }
