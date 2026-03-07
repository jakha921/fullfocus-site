FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS runner

RUN apt-get update && apt-get install -y openssl curl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/scripts ./scripts
RUN chmod +x ./scripts/start.sh

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./scripts/start.sh"]
