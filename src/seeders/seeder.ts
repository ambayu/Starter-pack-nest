import { PrismaClient } from '@prisma/client';
import { RoleSeederService } from './role/role.service';
import { PermissionSeederService } from './permission/permission.service';
import { UserSeederService } from './user/user.service';
import { PelaksanaSeederService } from './pelaksana';
import { PeranSeederService } from './peran';

export class SeedService {
  private prisma = new PrismaClient();

  async run() {
    console.log('🚀 Memulai seeding data...');

    const roleSeeder = new RoleSeederService(this.prisma);
    const permissionSeeder = new PermissionSeederService(this.prisma);
    const userSeeder = new UserSeederService(this.prisma);
    const pelaksanaSeederService = new PelaksanaSeederService(this.prisma);
    const peranSeederService = new PeranSeederService(this.prisma);
    await roleSeeder.seed();
    await permissionSeeder.seed();
    await userSeeder.seed();
    await pelaksanaSeederService.seed();
    await peranSeederService.seed();

    console.log('✅ Selesai menjalankan semua seeder.');
    await this.prisma.$disconnect();
  }
}

async function main() {
  await new SeedService().run();
}

main().catch((err) => {
  console.error('❌ Error saat menjalankan seeder:', err);
});
