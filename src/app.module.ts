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
import { PenugasanModule } from './penugasan/penugasan.module';
import { PeranModule } from './peran/peran.module';

@Module({
  imports: [
    UserModule,
    BiodataModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
    RolePermissionModule,
    AuthModule,
    PenugasanModule,
    PeranModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
