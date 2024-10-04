import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminService } from './admin/admin.service';
import { PrismaService } from './prisma/prisma.service';
import { LangChainService } from './lang-chain/lang-chain.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AdminService, PrismaService, LangChainService],
})
export class AppModule implements OnModuleInit {
  constructor(private adminService: AdminService) {}

  async onModuleInit() {
    await this.adminService.checkAdminExist();
  }
}
