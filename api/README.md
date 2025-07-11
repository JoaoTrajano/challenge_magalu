## Tecnologias Utilizadas

### Backend

- **[NestJS](https://nestjs.com/)**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Vitest + Supertest** para testes unitários e E2E

### Domain Driven Design

O projeto foi desenvolvido utilizando os conceitos de Domain Driven Design (DDD).

## Requisitos

- Node.js `v22+`
- pnpm `9+`
- Docker (se desejar usar containers de banco de dados)

## Scripts

Execute a partir da raiz do projeto:

### Backend (api)

| Comando                | Descrição                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `pnpm install`         | Instala todas as dependências de todos os pacotes                   |
| `pnpm run start:dev`   | Inicia em modo desenvolvimento                                      |
| `docker compose up -d` | Sobe os serviços definidos no `docker-compose.yml` em segundo plano |
