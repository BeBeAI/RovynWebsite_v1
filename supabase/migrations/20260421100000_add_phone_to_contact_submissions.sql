/*
  # Add phone column to contact submissions

  This migration updates existing projects that already have the
  contact_submissions table created.
*/

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS phone text;
