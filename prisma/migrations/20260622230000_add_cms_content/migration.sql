-- AlterTable
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "translations" JSONB;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "translations" JSONB;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN IF NOT EXISTS "translations" JSONB;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "translations" JSONB;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "translations" JSONB;

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContentBlock" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "ContentBlock_key_locale_key" ON "ContentBlock"("key", "locale");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ContentBlock_key_idx" ON "ContentBlock"("key");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ContentBlock_locale_idx" ON "ContentBlock"("locale");
