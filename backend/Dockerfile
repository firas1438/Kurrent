# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:22.20.0-slim AS dependencies

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund --omit=dev

COPY . .

RUN npx prisma generate

# ============================================
# Stage 2: Production runner
# ============================================
FROM node:22.20.0-slim AS runner

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/src ./src
COPY --from=dependencies /app/prisma ./prisma
COPY --from=dependencies /app/package*.json ./

USER node

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]