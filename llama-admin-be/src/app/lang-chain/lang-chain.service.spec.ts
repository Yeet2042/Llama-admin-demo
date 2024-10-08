import { Test, TestingModule } from '@nestjs/testing';
import { LangChainService } from './lang-chain.service';

describe('LangChainService', () => {
  let service: LangChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangChainService],
    }).compile();

    service = module.get<LangChainService>(LangChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shoud return AI response', async () => {
    const prompt = 'สวัสดี นายเป็นใคร';
    const result = (await service.getAIResponse(prompt)).content;

    console.log(result);
    expect(result).toBeDefined();
  }, 0)
});
