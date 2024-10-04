import { Test, TestingModule } from '@nestjs/testing';
import { LangChainController } from './lang-chain.controller';
import { LangChainService } from './lang-chain.service';

describe('LangChainController', () => {
  let controller: LangChainController;
  let service: LangChainService;

  const mockLangChainService = {
    getAIResponse: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangChainController],
      providers: [
        {
          provide: LangChainService,
          useValue: mockLangChainService,
        },
      ],
    }).compile();

    controller = module.get<LangChainController>(LangChainController);
    service = module.get<LangChainService>(LangChainService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call askAI and return the response', async () => {
    const prompt = "สวัสดี นายเป็นใคร";
    // const mockResponse = "สวัสดีครับ ผมคือ Watt-D ผู้ดูแลระบบ PEA Workflow เรามาให้บริการแก่คุณเกี่ยวกับการจัดการข้อมูลงบประมาณกันครับ";

    const result = await controller.generate({ prompt });

    console.log(result)

    expect(service.getAIResponse).toHaveBeenCalledWith(prompt);
  }, 0);
});
