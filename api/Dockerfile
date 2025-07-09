FROM node:22.11-alpine3.19 AS build

RUN npm install -g pnpm

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run prisma:generate
RUN pnpm run build

FROM node:22.11-alpine3.19 AS production

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/shared/infrastructure/database/postgres/adapters/prisma ./src/shared/infrastructure/database/postgres/adapters/prisma

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD [ "pnpm", "run", "start:prod" ]
