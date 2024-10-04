import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdminService', () => {
  let service: AdminService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, PrismaService],
    }).compile();

    service = module.get<AdminService>(AdminService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an admin user if none exists', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 1,
      email: 'admin@example.com',
      username: 'admin',
      password: 'hashed_password',
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await service.checkAdminExist();

    expect(prisma.user.create).toHaveBeenCalled();
  })

  it('should not create an admin user if one exists', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValue({
      id: 1,
      email: 'admin@example.com',
      username: 'admin',
      password: 'hashed_password',
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createSpy = jest.spyOn(prisma.user, 'create');

    await service.checkAdminExist();

    expect(createSpy).not.toHaveBeenCalled();
  });
});
