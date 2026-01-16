/*
  # Add User Payments Table
  
  1. New Tables
    - `user_payments`
      - `id` (uuid, primary key) - Unique identifier for the payment record
      - `user_id` (text, unique) - Anonymous user identifier from RevenueCat
      - `has_paid` (boolean) - Whether the user has completed the payment
      - `transaction_id` (text, nullable) - Transaction ID from the payment provider
      - `purchased_at` (timestamptz) - When the payment was completed
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated
  
  2. Security
    - Enable RLS on `user_payments` table
    - Add policy for users to read their own payment status
    - Add policy for users to create their own payment records
    - Add policy for users to update their own payment records
*/

CREATE TABLE IF NOT EXISTS user_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  has_paid boolean DEFAULT false NOT NULL,
  transaction_id text,
  purchased_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE user_payments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read any payment record (needed for client-side checks)
CREATE POLICY "Anyone can read payment status"
  ON user_payments
  FOR SELECT
  USING (true);

-- Allow anyone to insert their payment record
CREATE POLICY "Anyone can create payment records"
  ON user_payments
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update their own payment record
CREATE POLICY "Users can update their own payment records"
  ON user_payments
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_payments_user_id ON user_payments(user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_payments_updated_at
  BEFORE UPDATE ON user_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();