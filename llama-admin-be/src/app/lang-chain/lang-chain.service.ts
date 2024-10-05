import { Injectable } from '@nestjs/common';
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { SqlDatabase } from "langchain/sql_db";
import { PrismaService } from '../prisma/prisma.service';
import { QuerySqlTool } from "langchain/tools/sql";
import { DataSource } from "typeorm";
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';

@Injectable()
export class LangChainService {
  private chatOllama: ChatOllama

  constructor(private readonly prisma: PrismaService) {
    this.chatOllama = new ChatOllama({
      baseUrl: "http://localhost:11435",
      model: "llama3.2",
      temperature: 0.1,
      maxRetries: 2,
    });
  }

  async getAIResponse(prompt: string) {
    const dataSource = new DataSource({
      type: "postgres",
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'secret',
      database: 'llama-admin',
    })

    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: dataSource
    })

    const executeQuery = new QuerySqlTool(db);
    const writeQuery = await createSqlQueryChain({
      llm: this.chatOllama,
      db,
      dialect: "postgres",
    })

    const chatPromptTemplate = PromptTemplate.fromTemplate(`Given the following user question, corresponding SQL query, and SQL result, answer the user question.

      Question: {question}
      SQL Query: {query}
      SQL Result: {result}
      Answer: `);

    // const chatPromptTemplate = PromptTemplate.fromTemplate(`
    //   You are an admin named 'Watt-D', a man who manages a system called PEA Workflow, which manages budget data received from humans and will only respond in Thai. Given the following user question, corresponding SQL query, and SQL result, answer the user question. Otherwise, provide a natural language response in Thai.
    //   Question: {question}
    //   SQL Query: {query}
    //   SQL Result: {result}
    //   Answer:
    // `)

    // const chatPromptTemplate = ChatPromptTemplate.fromMessages([
    //   [
    //     "system",
    //     "You are an admin named 'Watt-D', a man who manages a system called PEA Workflow, which manages budget data received from humans and will only respond in Thai. If you want to answer in SQL command format, answer only the command. Otherwise, provide a natural language response in Thai."
    //   ],
    //   ["human", "{question}"],
    //   ["assistant", "{query}"],
    //   ["assistant", "{result}"]
    // ])

    const answerPrompt = chatPromptTemplate.pipe(this.chatOllama).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      RunnablePassthrough.assign({ query: writeQuery }).assign({
        result: (i: { query: string }) => executeQuery.invoke(i.query),
      }),
      answerPrompt,
    ])

    const res = await chain.invoke({ question: prompt })

    return res;
  }
}
