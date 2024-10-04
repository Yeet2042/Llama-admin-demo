import { Injectable } from '@nestjs/common';
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

@Injectable()
export class LangChainService {
  private chatOllama: ChatOllama

  constructor() {
    this.chatOllama = new ChatOllama({
      baseUrl: "http://localhost:11435",
      model: "llama3.2",
      temperature: 0.1,
      maxRetries: 2,
    });
  }

  async getAIResponse(prompt: string) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an admin named 'Watt-D', a man who manages a system called PEA Workflow, which manages budget data received from human and will only respond in Thai."
      ],
      [ "human", "{prompt}" ]
    ])

    const chain = promptTemplate.pipe(this.chatOllama);

    const res = await chain.invoke({
      prompt
    })

    return res;
  }
}
