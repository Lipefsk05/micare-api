-- Migration: remove pnrh column and add conduta to consultations
-- Generated: 2026-06-08

BEGIN;

-- Remove legacy column `pnrh` if it exists
ALTER TABLE IF EXISTS "prenatal_cards" DROP COLUMN IF EXISTS "pnrh";

-- Add `conduta` column to consultations (if not present)
ALTER TABLE IF EXISTS "consultations" ADD COLUMN IF NOT EXISTS "conduta" TEXT;

COMMIT;
