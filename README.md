
# Llama Admin Workspace
This project is a demo to test an AI Admin Chatbot using LangChain with Llama 3.2 (3B) running on Ollama for language model processing (LLM).

### Requirements
* System Memory (RAM >= 16 Gb) or Dedicated Nvidia GPU (VRAM > 3 Gb)
## To Run This Project

Start Docker-Compose Service (Please wait until Pulling model success.)

```bash
  sudo docker compose up
```

Install Dependencies (Create new therminal)

```bash
  npm i
```

Migrate Database

```bash
  npx prisma migrate dev
```

Start Backend

```bash
  npx nx serve llama-admin-be
```
## API Reference

#### Generate SQL Query Chat

```http
  POST /api/lang-chain/generate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `prompt`      | `string` | **Required**. Prompt to llm |

Takes prompt and returns the context.

Ex.
{
    "prompt": "มีจำนวน budget เท่าไหร่"
}
## Tech Stack

**Client:** Angular

**Server:** NestJS, NX
