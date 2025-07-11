# Desafio Front-end - Consórcio Magalu

Esse desafio tem como objetivo aferir conhecimentos diversos do universo de front-end: **HTML**,**CSS**,**Javascript**, semântica, acessibilidade, componentização

---

## Tecnologias Utilizadas

### Backend

- **[NestJS](https://nestjs.com/)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Vitest + Supertest** para testes unitários e E2E

### Frontend

- **[Next.js](https://nextjs.org/)**
- **TypeScript**
- **TailwindCSS**
- **React Query** para chamadas à API

## Requisitos

- Node.js `v22+`
- pnpm `9+`
- Docker (se desejar usar containers de banco de dados)

## Scripts

Execute a partir da raiz de cada projeto:

### Frontend (web)

| Comando        | Descrição                                     |
| -------------- | --------------------------------------------- |
| `pnpm install` | Instala as dependências do frontend           |
| `pnpm dev`     | Inicia o **frontend** em modo desenvolvimento |

### Backend (api)

| Comando                | Descrição                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `pnpm install`         | Instala todas as dependências de todos os pacotes                   |
| `pnpm run start:dev`   | Inicia **api** em modo desenvolvimento                              |
| `docker compose up -d` | Sobe os serviços definidos no `docker-compose.yml` em segundo plano |
