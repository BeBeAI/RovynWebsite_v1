/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Contact name
      - `email` (text) - Contact email address
      - `company_size` (text) - Company size selection
      - `interest` (text) - Area of interest
      - `message` (text) - Additional message/notes
      - `created_at` (timestamptz) - Timestamp of submission
      - `ip_address` (text, optional) - IP address for spam prevention
      - `user_agent` (text, optional) - Browser user agent
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their own submissions
    - No read/update/delete policies (admin-only access via service role)
  
  3. Notes
    - Anonymous submissions are allowed (public contact form)
    - Timestamps are automatically set on creation
    - Data retention policies should be implemented separately
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company_size text NOT NULL,
  interest text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
