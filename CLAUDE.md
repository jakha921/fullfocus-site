# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FullFocus** — корпоративный сайт IT-компании. Next.js 14 (App Router) + Prisma (PostgreSQL) + NextAuth.js.

Production: `https://site.fullfocus.dev`

## Commands

```bash
# Development
npm run dev                    # localhost:3000

# Build & lint
npm run build
npm run lint

# Database
npx prisma generate            # генерировать Prisma Client
npx prisma migrate dev         # создать и применить миграцию (dev)
npx prisma migrate deploy      # применить существующие миграции (prod)
npx prisma studio              # GUI для БД
npm run db:seed                # заполнить начальными данными (tsx prisma/seed.ts)
```

## Architecture

### Tech Stack
- **Next.js 14** — App Router, `output: "standalone"` для Docker
- **Prisma** — ORM с PostgreSQL (`provider: "postgresql"`)
- **NextAuth.js v4** — JWT-сессии, Credentials Provider, кастомная страница `/login`
- **next-intl** — i18n через cookie `locale` (en/ru/uz), конфиг в `src/lib/i18n.ts`
- **Tailwind CSS** — тёмная тема (bg `#0a0a0a`)
- **Framer Motion** — анимации
- **Zod** — валидация форм

### Directory Structure

```
src/
├── app/
│   ├── page.tsx              # Главная (Hero + Services + Portfolio + Blog + ...)
│   ├── layout.tsx            # Root layout: Header + Footer + Providers
│   ├── admin/                # Панель управления (client-side auth guard)
│   │   └── layout.tsx        # Проверяет сессию, редиректит на /login
│   ├── api/
│   │   ├── admin/            # CRUD endpoints (blog, projects, services, team, ...)
│   │   ├── auth/[...nextauth]/ # NextAuth handler
│   │   ├── contact/          # Форма обратной связи
│   │   ├── quiz/             # Lead-квиз
│   │   └── stats/            # Статистика для главной
│   ├── blog/, portfolio/, services/, about/, contact/, quiz/
│   └── login/
├── components/
│   ├── ui/                   # Базовые: Button, Input, Card, Modal, Badge, ...
│   ├── site/                 # Секции публичного сайта (Hero, Header, Footer, ...)
│   ├── admin/                # Sidebar, AdminHeader
│   ├── quiz/                 # LeadQuiz компонент
│   └── seo/                  # SEOHead, StructuredData
├── lib/
│   ├── auth.ts               # NextAuth config + module augmentation
│   ├── prisma.ts             # Prisma singleton client
│   ├── i18n.ts               # next-intl config (locale из cookie)
│   └── utils.ts              # cn() и утилиты
├── locales/                  # en/ru/uz переводы (common.json)
└── types/index.ts            # TypeScript интерфейсы (Service, Project, BlogPost, ...)
```

### Data Models (Prisma)
`User`, `Service`, `Project`, `TeamMember`, `BlogPost`, `ContactRequest`, `Testimonial`, `Setting`, `QuizResult`

### Admin Panel
- Роут `/admin/*` защищён клиентской проверкой сессии в `admin/layout.tsx`
- API маршруты `/api/admin/*` — отдельная серверная проверка сессии
- Вход через `/login`, NextAuth Credentials Provider с bcrypt

### i18n
Локаль определяется из cookie `locale`. Переключение через UI → устанавливает cookie.

## Environment Variables

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://site.fullfocus.dev   # локально: http://localhost:3000
TELEGRAM_BOT_TOKEN=                       # опционально — уведомления о заявках
TELEGRAM_CHAT_ID=                         # опционально
```

## ESLint

Используется `.eslintrc.json` (НЕ `eslint.config.mjs`). Next.js 14 с ESLint v8 несовместим с flat config формата ESLint v9. Конфиг:
```json
{ "extends": ["next/core-web-vitals", "next/typescript"] }
```
Паттерн для неиспользуемых переменных: `_`-префикс (`_error`, `_params`).

## Docker / Deployment

- `Dockerfile` — multi-stage build (builder + runner), `node:20-slim`
- `scripts/start.sh` — запускает `prisma migrate deploy` перед стартом сервера
- `docker-compose.prod.yml` — прод конфиг, все secrets через `${VAR}` (задаются в Coolify UI), сеть `coolify` (external)

### CI/CD (GitHub Actions → Coolify)

`.github/workflows/deploy.yml` при пуше в `master`:
1. `npm run lint`
2. `npm run build` (с placeholder `DATABASE_URL` и `NEXTAUTH_SECRET`)
3. Триггерит Coolify webhook: `GET /api/v1/deploy?uuid=...` с `Authorization: Bearer $COOLIFY_TOKEN`

GitHub secrets: `COOLIFY_WEBHOOK` (URL) + `COOLIFY_TOKEN` (API токен из Coolify dashboard).

# currentDate
Today's date is 2026-03-08.
