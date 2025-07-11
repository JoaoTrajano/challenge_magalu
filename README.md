# Monorepo - Backend com NestJS e Frontend com Next.js

Este projeto é um monorepo que integra uma **API RESTful desenvolvida com NestJS** e uma **interface web moderna construída com Next.js**. A arquitetura foi pensada para promover **escalabilidade, reuso de código e organização modular**, permitindo o uso de bibliotecas compartilhadas entre backend e frontend.

---

## Tecnologias Utilizadas

### Backend
- **[NestJS](https://nestjs.com/)** — Framework progressivo para Node.js
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Vitest + Supertest** para testes unitários e E2E

### Frontend
- **[Next.js](https://nextjs.org/)** — Framework React com SSR e SPA
- **TypeScript**
- **TailwindCSS**
- **React Query** para chamadas à API

## Requisitos

- Node.js `v22+`
- pnpm `9+`
- Docker (se desejar usar containers de banco de dados)

- ## 🧪 Scripts

Execute a partir da raiz do projeto:

| Comando                | Descrição                                  |
|------------------------|--------------------------------------------|
| `pnpm install`         | Instala todas as dependências              |
| `pnpm dev`             | Inicia API e Web em modo desenvolvimento   |
