-- CreateTable
CREATE TABLE "systems" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "best_for" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "license_spdx" TEXT NOT NULL,
    "license_url" TEXT NOT NULL,
    "license_notes" TEXT,
    "provenance" JSONB NOT NULL,
    "links" JSONB NOT NULL,
    "restricted" BOOLEAN NOT NULL DEFAULT false,
    "restricted_reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "spec_version" TEXT NOT NULL,
    "token_summary" JSONB,
    "file_etags" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_categories" (
    "system_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "system_categories_pkey" PRIMARY KEY ("system_id","category_id")
);

-- CreateTable
CREATE TABLE "counters" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lint_reports" (
    "id" TEXT NOT NULL,
    "system_id" TEXT NOT NULL,
    "errors" INTEGER NOT NULL,
    "warnings" INTEGER NOT NULL,
    "info" INTEGER NOT NULL,
    "findings" JSONB NOT NULL,
    "linted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lint_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "systems_slug_key" ON "systems"("slug");

-- CreateIndex
CREATE INDEX "systems_status_path_idx" ON "systems"("status", "path");

-- CreateIndex
CREATE UNIQUE INDEX "counters_slug_type_key" ON "counters"("slug", "type");

-- CreateIndex
CREATE UNIQUE INDEX "lint_reports_system_id_key" ON "lint_reports"("system_id");

-- AddForeignKey
ALTER TABLE "system_categories" ADD CONSTRAINT "system_categories_system_id_fkey" FOREIGN KEY ("system_id") REFERENCES "systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_categories" ADD CONSTRAINT "system_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lint_reports" ADD CONSTRAINT "lint_reports_system_id_fkey" FOREIGN KEY ("system_id") REFERENCES "systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
