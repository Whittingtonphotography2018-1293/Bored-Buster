/*
  # Fix random activities function

  1. Changes
    - Change function from STABLE to VOLATILE to ensure true randomization on every call
    - STABLE functions can be cached by PostgreSQL, causing repeated results
    - VOLATILE ensures the function is re-executed each time for different random results

  2. Purpose
    - Fixes the issue where users see the same activities cycling through
    - Ensures each request gets a fresh random selection
*/

CREATE OR REPLACE FUNCTION get_random_activities(
  p_age_group text,
  p_limit integer DEFAULT 50
)
RETURNS TABLE (activity text)
LANGUAGE sql
VOLATILE
AS $$
  SELECT a.activity
  FROM activities a
  WHERE a.age_group = p_age_group
  ORDER BY random()
  LIMIT p_limit;
$$;