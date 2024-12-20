/*
  # Initial Schema Setup

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `images` (text array)
      - `specifications` (jsonb)
      - `features` (text array)
      - `location` (text)
      - `created_at` (timestamptz)
      - `price` (numeric, nullable)
      - `status` (enum: available, pending, sold)

    - `leads`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `full_name` (text)
      - `phone_number` (text)
      - `email` (text, nullable)
      - `message` (text, nullable)
      - `listing_id` (uuid, foreign key to listings)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create enum type for listing status
CREATE TYPE listing_status AS ENUM ('available', 'pending', 'sold');

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  specifications jsonb NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  location text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  price numeric,
  status listing_status NOT NULL DEFAULT 'available'
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  email text,
  message text,
  listing_id uuid REFERENCES listings(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for listings
CREATE POLICY "Allow public read access"
  ON listings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON listings
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for leads
CREATE POLICY "Allow authenticated users full access to leads"
  ON leads
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to create leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);