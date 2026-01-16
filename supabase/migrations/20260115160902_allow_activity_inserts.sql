/*
  # Allow Activity Inserts for Seeding

  1. Changes
    - Add policy to allow authenticated users to insert activities (for seeding purposes)
    - This allows the generation script to populate the database

  2. Security
    - Only authenticated users can insert
    - Can be removed after seeding if needed
*/

-- Drop policy if it exists and recreate
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'activities'
    AND policyname = 'Authenticated users can insert activities'
  ) THEN
    DROP POLICY "Authenticated users can insert activities" ON activities;
  END IF;
END $$;

-- Allow authenticated users to insert activities
CREATE POLICY "Authenticated users can insert activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);
