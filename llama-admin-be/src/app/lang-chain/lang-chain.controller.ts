import { Body, Controller, Post } from '@nestjs/common';
import { LangChainService } from './lang-chain.service';

interface Request {
  prompt: string
}

@Controller('lang-chain')
export class LangChainController {
  constructor(private readonly langChainService: LangChainService) {}

  @Post('generate')
  async generate(@Body() request: Request) {
    const { prompt } = request
    const res = await this.langChainService.getAIResponse(prompt);
    return {
      prompt,
      res,
    };
  }
}
