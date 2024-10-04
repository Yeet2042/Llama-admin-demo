import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService  {
  constructor(private readonly prisma: PrismaService) {}

  async checkAdminExist(): Promise<void> {
    const admin = await this.prisma.user.findFirst({
       where: { role: 'ADMIN' }
    });

    const adminEmail = process.env.ADMIN_EMAIL
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!admin) {
      console.log("Creating Admin user...");

      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await this.prisma.user.create({
        data: {
          email: adminEmail,
          username: adminUsername,
          password: hashedPassword,
          role: 'ADMIN'
        }
      })

      console.log(`Admin username: ${adminUsername}\nAdmin password: ${adminPassword}`);
    }
    else {
      console.log(`Admin username: ${adminUsername}\nAdmin password: ${adminPassword}`);
    }
  }
}
