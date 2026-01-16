/*
  # Add random activities function

  1. New Functions
    - `get_random_activities` - Returns random activities for a given age group
      - Uses PostgreSQL's random() for true randomization
      - Limits results to improve performance
      - Ensures better activity variety

  2. Purpose
    - Provides properly randomized activities from the database
    - Eliminates repetition issues by using database-level randomization
    - More efficient than client-side randomization
*/

CREATE OR REPLACE FUNCTION get_random_activities(
  p_age_group text,
  p_limit integer DEFAULT 50
)
RETURNS TABLE (activity text)
LANGUAGE sql
STABLE
AS $$
  SELECT a.activity
  FROM activities a
  WHERE a.age_group = p_age_group
  ORDER BY random()
  LIMIT p_limit;
$$;