-- AlterTable
ALTER TABLE "Service" ADD COLUMN "translations" JSONB;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "translations" JSONB;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN "translations" JSONB;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN "translations" JSONB;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "translations" JSONB;

-- CreateTable
CREATE TABLE "ContentBlock" (
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
CREATE UNIQUE INDEX "ContentBlock_key_locale_key" ON "ContentBlock"("key", "locale");

-- CreateIndex
CREATE INDEX "ContentBlock_key_idx" ON "ContentBlock"("key");

-- CreateIndex
CREATE INDEX "ContentBlock_locale_idx" ON "ContentBlock"("locale");
