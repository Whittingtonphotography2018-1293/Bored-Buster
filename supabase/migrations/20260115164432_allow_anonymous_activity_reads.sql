/*
  # Allow anonymous users to read activities
  
  1. Changes
    - Update RLS policy to allow both authenticated and anonymous users to read activities
    - This ensures the app works for users who aren't logged in
  
  2. Security
    - Reading activities is safe for anonymous users
    - Write operations still require authentication
*/

DROP POLICY IF EXISTS "Anyone can view activities" ON activities;

CREATE POLICY "Anyone can view activities"
  ON activities
  FOR SELECT
  TO authenticated, anon
  USING (true);
