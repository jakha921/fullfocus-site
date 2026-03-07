# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FullFocus** — корпоративный сайт IT-компании. Next.js 14 (App Router) + Prisma (PostgreSQL) + NextAuth.js.

Production: `https://site.fullfocus.dev`

## Commands

```bash
# Development
npm run dev                    # localhost:3000
PORT=8080 npm run dev          # кастомный порт

# Build & start
npm run build
npm start

# Database
npx prisma generate            # генерировать Prisma Client
npx prisma migrate dev         # применить миграции
npx prisma studio              # GUI для БД
npm run db:seed                # заполнить тестовыми данными (tsx prisma/seed.ts)

# Lint
npm run lint
```

## Architecture

### Tech Stack
- **Next.js 14** — App Router, Server Actions, `output: "standalone"` для Docker
- **Prisma** — ORM с PostgreSQL (provider: `postgresql`)
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
NEXTAUTH_URL=https://site.fullfocus.dev   # для прода; локально http://localhost:3000
```

## Docker / Deployment
- `Dockerfile` — multi-stage build, `output: "standalone"` в `next.config.mjs`
- `docker-compose.prod.yml` — прод, сеть `coolify` (shared PostgreSQL `shared-postgres`)
- `ecosystem.config.js` — PM2 конфиг (порт 3000)
