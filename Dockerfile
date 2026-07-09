FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json .
COPY bun.lock .
COPY .env .

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun --bun run build

FROM oven/bun:latest AS buntime

WORKDIR /app

COPY --from=builder /app/.output .

CMD ["bun", "--bun",  "run", "./server/index.mjs"]