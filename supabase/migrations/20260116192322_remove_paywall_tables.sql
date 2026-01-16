/*
  # Remove Paywall Tables

  ## Changes
    - Drop the `user_payments` table as the app no longer requires payment functionality
    - This removes all payment tracking and related constraints
  
  ## Security
    - Existing data will be permanently deleted
    - This operation is safe as the app is removing the paywall feature entirely
*/

-- Drop user_payments table
DROP TABLE IF EXISTS user_payments CASCADE;
