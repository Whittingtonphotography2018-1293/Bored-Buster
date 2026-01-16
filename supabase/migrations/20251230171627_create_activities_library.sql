/*
  # Activities Library Database

  1. New Tables
    - `activities`
      - `id` (uuid, primary key) - Unique identifier
      - `activity` (text) - The activity description
      - `age_group` (text) - Target age group (toddlers, preschoolers, earlyElementary, lateElementary, teens)
      - `category` (text) - Activity category (creative, physical, educational, social, outdoor, indoor, screen_free)
      - `materials_needed` (text) - Materials required (none, basic, moderate, extensive)
      - `duration` (text) - Expected duration (quick, medium, long)
      - `created_at` (timestamptz) - When activity was added

  2. Security
    - Enable RLS on activities table
    - Allow all authenticated users to read activities
    - Only system can insert/update/delete activities

  3. Indexes
    - Index on age_group for fast filtering
    - Index on category for filtering by type
*/

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  age_group text NOT NULL,
  category text DEFAULT 'general',
  materials_needed text DEFAULT 'basic',
  duration text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read activities
CREATE POLICY "Anyone can view activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_activities_age_group ON activities(age_group);
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

-- Insert comprehensive activities for TODDLERS (Ages 1-3)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Play "Eye Spy" with colors around the house', 'toddlers', 'educational', 'none', 'quick'),
  ('Build a tower with blocks and knock it down', 'toddlers', 'physical', 'basic', 'quick'),
  ('Draw with sidewalk chalk on the driveway', 'toddlers', 'creative', 'basic', 'medium'),
  ('Have a mini dance party to favorite songs', 'toddlers', 'physical', 'none', 'quick'),
  ('Play animal sounds guessing game', 'toddlers', 'educational', 'none', 'quick'),
  ('Sort colorful buttons or pom-poms by color', 'toddlers', 'educational', 'basic', 'quick'),
  ('Make music with pots and wooden spoons', 'toddlers', 'creative', 'basic', 'quick'),
  ('Practice pouring water between cups', 'toddlers', 'educational', 'basic', 'medium'),
  ('Play with bubbles in the backyard', 'toddlers', 'outdoor', 'basic', 'quick'),
  ('Read favorite picture books together', 'toddlers', 'educational', 'basic', 'medium'),
  ('Create a sensory bin with rice and toys', 'toddlers', 'creative', 'moderate', 'medium'),
  ('Play hide and seek with stuffed animals', 'toddlers', 'physical', 'basic', 'quick'),
  ('Make finger paint art', 'toddlers', 'creative', 'moderate', 'medium'),
  ('Stack and nest plastic containers', 'toddlers', 'educational', 'basic', 'quick'),
  ('Go on a nature walk and collect leaves', 'toddlers', 'outdoor', 'none', 'medium'),
  ('Play with playdough and cookie cutters', 'toddlers', 'creative', 'basic', 'medium'),
  ('Practice putting shapes in a shape sorter', 'toddlers', 'educational', 'basic', 'quick'),
  ('Sing nursery rhymes with hand motions', 'toddlers', 'educational', 'none', 'quick'),
  ('Roll a ball back and forth', 'toddlers', 'physical', 'basic', 'quick'),
  ('Look at pictures and name the objects', 'toddlers', 'educational', 'basic', 'quick');

-- Insert comprehensive activities for PRESCHOOLERS (Ages 3-5)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Play "Would You Rather" with silly choices', 'preschoolers', 'social', 'none', 'quick'),
  ('Create a puppet show with hand puppets', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Go on a backyard scavenger hunt', 'preschoolers', 'outdoor', 'basic', 'medium'),
  ('Make paper airplanes and race them', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Draw your dream house', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Practice writing letters in a salt tray', 'preschoolers', 'educational', 'basic', 'medium'),
  ('Build a fort with blankets and pillows', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Play grocery store with play food', 'preschoolers', 'social', 'basic', 'medium'),
  ('Create patterns with colored beads', 'preschoolers', 'educational', 'basic', 'quick'),
  ('Paint rocks to look like animals', 'preschoolers', 'creative', 'moderate', 'medium'),
  ('Practice counting by jumping', 'preschoolers', 'educational', 'none', 'quick'),
  ('Play dress-up with costumes', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Have a teddy bear tea party', 'preschoolers', 'social', 'basic', 'medium'),
  ('Create an obstacle course indoors', 'preschoolers', 'physical', 'basic', 'medium'),
  ('Match uppercase and lowercase letters', 'preschoolers', 'educational', 'basic', 'quick'),
  ('Make simple origami animals', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Play freeze dance with music', 'preschoolers', 'physical', 'none', 'quick'),
  ('Practice cutting with safety scissors', 'preschoolers', 'educational', 'basic', 'medium'),
  ('Build with magnetic tiles', 'preschoolers', 'creative', 'moderate', 'medium'),
  ('Plant seeds in small pots', 'preschoolers', 'educational', 'moderate', 'medium');

-- More activities for each age group (continuing with variety)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Create a collage with magazine cutouts', 'preschoolers', 'creative', 'moderate', 'medium'),
  ('Practice tying shoelaces', 'preschoolers', 'educational', 'basic', 'quick'),
  ('Make a weather chart and track daily weather', 'preschoolers', 'educational', 'basic', 'medium'),
  ('Act out favorite storybook characters', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Sort toys by size, color, or type', 'preschoolers', 'educational', 'basic', 'quick'),
  ('Create shadow puppets with flashlight', 'preschoolers', 'creative', 'basic', 'medium'),
  ('Practice hopping on one foot', 'preschoolers', 'physical', 'none', 'quick'),
  ('Make a bird feeder with pinecones', 'preschoolers', 'outdoor', 'moderate', 'medium'),
  ('Play Simon Says', 'preschoolers', 'physical', 'none', 'quick'),
  ('Create name art with stickers', 'preschoolers', 'creative', 'basic', 'medium');

-- Insert comprehensive activities for EARLY ELEMENTARY (Ages 5-8)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('DIY craft challenge with recycled items', 'earlyElementary', 'creative', 'moderate', 'medium'),
  ('Invent a new board game', 'earlyElementary', 'creative', 'moderate', 'long'),
  ('Write a short story together', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Set up an obstacle course', 'earlyElementary', 'physical', 'moderate', 'medium'),
  ('Try a "Minute to Win It" mini game', 'earlyElementary', 'physical', 'basic', 'quick'),
  ('Create a comic strip', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Learn basic origami', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Build a cardboard city', 'earlyElementary', 'creative', 'moderate', 'long'),
  ('Practice coding with free online games', 'earlyElementary', 'educational', 'none', 'medium'),
  ('Make friendship bracelets', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Create a treasure hunt with clues', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Do a simple science experiment', 'earlyElementary', 'educational', 'moderate', 'medium'),
  ('Write and illustrate a mini book', 'earlyElementary', 'creative', 'basic', 'long'),
  ('Practice multiplication with flashcards', 'earlyElementary', 'educational', 'basic', 'quick'),
  ('Build a bridge with toothpicks', 'earlyElementary', 'educational', 'basic', 'medium'),
  ('Create stop-motion animation', 'earlyElementary', 'creative', 'moderate', 'long'),
  ('Play charades with action words', 'earlyElementary', 'social', 'none', 'quick'),
  ('Make paper fortune tellers', 'earlyElementary', 'creative', 'basic', 'quick'),
  ('Start a nature journal', 'earlyElementary', 'outdoor', 'basic', 'medium'),
  ('Practice jump rope tricks', 'earlyElementary', 'physical', 'basic', 'medium');

-- More early elementary activities
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Design and build with LEGOs', 'earlyElementary', 'creative', 'moderate', 'medium'),
  ('Learn to juggle with scarves', 'earlyElementary', 'physical', 'basic', 'medium'),
  ('Create a family newsletter', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Make a time capsule', 'earlyElementary', 'creative', 'moderate', 'medium'),
  ('Practice telling time', 'earlyElementary', 'educational', 'basic', 'quick'),
  ('Build a marble run', 'earlyElementary', 'creative', 'moderate', 'medium'),
  ('Create word searches for family', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Learn basic magic tricks', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Make homemade slime', 'earlyElementary', 'creative', 'moderate', 'medium'),
  ('Practice yoga poses for kids', 'earlyElementary', 'physical', 'none', 'quick'),
  ('Create a puppet show script', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Build a fort and camp indoors', 'earlyElementary', 'creative', 'basic', 'long'),
  ('Make paper airplanes and test designs', 'earlyElementary', 'creative', 'basic', 'medium'),
  ('Start a collection (rocks, stamps, etc)', 'earlyElementary', 'creative', 'basic', 'long'),
  ('Practice calligraphy or hand lettering', 'earlyElementary', 'creative', 'basic', 'medium');

-- Insert comprehensive activities for LATE ELEMENTARY (Ages 8-12)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Create a short film or skit', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Host a cooking challenge', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Make a vision board', 'lateElementary', 'creative', 'moderate', 'medium'),
  ('Draw or design a digital comic', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Try a science experiment', 'lateElementary', 'educational', 'moderate', 'medium'),
  ('Learn to solve a Rubik''s cube', 'lateElementary', 'educational', 'basic', 'long'),
  ('Create an invention with household items', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Write and perform a song', 'lateElementary', 'creative', 'basic', 'long'),
  ('Build a miniature garden', 'lateElementary', 'outdoor', 'moderate', 'medium'),
  ('Learn basic photography', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Design a dream bedroom floor plan', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Practice a new sport skill', 'lateElementary', 'physical', 'basic', 'medium'),
  ('Create an escape room at home', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Learn basic sewing or knitting', 'lateElementary', 'creative', 'moderate', 'medium'),
  ('Make a stop-motion movie', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Start a blog or journal', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Build a robot with craft supplies', 'lateElementary', 'creative', 'moderate', 'medium'),
  ('Create a business plan for a pretend company', 'lateElementary', 'educational', 'basic', 'medium'),
  ('Learn magic tricks from tutorials', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Design and build a treehouse model', 'lateElementary', 'creative', 'moderate', 'long');

-- More late elementary activities
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Create a podcast episode', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Learn to play chess', 'lateElementary', 'educational', 'basic', 'medium'),
  ('Design custom t-shirts', 'lateElementary', 'creative', 'moderate', 'medium'),
  ('Make a family tree poster', 'lateElementary', 'educational', 'basic', 'medium'),
  ('Build Rube Goldberg machine', 'lateElementary', 'creative', 'extensive', 'long'),
  ('Learn basic first aid', 'lateElementary', 'educational', 'basic', 'medium'),
  ('Create a budget for imaginary money', 'lateElementary', 'educational', 'basic', 'quick'),
  ('Make homemade bath bombs', 'lateElementary', 'creative', 'moderate', 'medium'),
  ('Design a logo for yourself', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Learn to type faster', 'lateElementary', 'educational', 'none', 'medium'),
  ('Create origami art', 'lateElementary', 'creative', 'basic', 'medium'),
  ('Build with household engineering challenge', 'lateElementary', 'educational', 'moderate', 'medium'),
  ('Learn basic HTML coding', 'lateElementary', 'educational', 'none', 'long'),
  ('Make a claymation video', 'lateElementary', 'creative', 'moderate', 'long'),
  ('Practice public speaking skills', 'lateElementary', 'educational', 'none', 'medium');

-- Insert comprehensive activities for TEENS (Ages 13+)
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Create a YouTube video concept', 'teens', 'creative', 'moderate', 'long'),
  ('Learn a new recipe and cook dinner', 'teens', 'creative', 'moderate', 'long'),
  ('Start a side hustle brainstorm', 'teens', 'educational', 'basic', 'medium'),
  ('Design a mobile app concept', 'teens', 'creative', 'basic', 'medium'),
  ('Do a "no-internet" challenge for one hour', 'teens', 'screen_free', 'none', 'medium'),
  ('Learn photo editing skills', 'teens', 'creative', 'none', 'medium'),
  ('Write a college or scholarship essay', 'teens', 'educational', 'basic', 'long'),
  ('Create a workout routine', 'teens', 'physical', 'none', 'medium'),
  ('Learn basic investing concepts', 'teens', 'educational', 'none', 'medium'),
  ('Make a resume or portfolio', 'teens', 'educational', 'basic', 'medium'),
  ('Learn a new language basics', 'teens', 'educational', 'none', 'long'),
  ('Create digital art', 'teens', 'creative', 'moderate', 'medium'),
  ('Start a passion project', 'teens', 'creative', 'moderate', 'long'),
  ('Learn video editing', 'teens', 'creative', 'none', 'long'),
  ('Practice debate skills', 'teens', 'educational', 'none', 'medium'),
  ('Design a personal brand', 'teens', 'creative', 'basic', 'medium'),
  ('Learn basic car maintenance', 'teens', 'educational', 'moderate', 'medium'),
  ('Create a study schedule', 'teens', 'educational', 'basic', 'quick'),
  ('Write poetry or song lyrics', 'teens', 'creative', 'basic', 'medium'),
  ('Learn meditation techniques', 'teens', 'physical', 'none', 'quick');

-- More teen activities
INSERT INTO activities (activity, age_group, category, materials_needed, duration) VALUES
  ('Build a personal website', 'teens', 'educational', 'none', 'long'),
  ('Learn skateboard tricks', 'teens', 'physical', 'moderate', 'medium'),
  ('Create a fashion lookbook', 'teens', 'creative', 'basic', 'medium'),
  ('Learn advanced photography', 'teens', 'creative', 'moderate', 'long'),
  ('Start a book club', 'teens', 'social', 'basic', 'long'),
  ('Learn guitar chords', 'teens', 'creative', 'moderate', 'medium'),
  ('Create a five-year plan', 'teens', 'educational', 'basic', 'medium'),
  ('Learn makeup or skincare routines', 'teens', 'creative', 'moderate', 'medium'),
  ('Practice interview skills', 'teens', 'educational', 'none', 'medium'),
  ('Build a gaming PC (research)', 'teens', 'educational', 'none', 'medium'),
  ('Learn calligraphy', 'teens', 'creative', 'basic', 'medium'),
  ('Create a TikTok dance', 'teens', 'physical', 'none', 'quick'),
  ('Learn graphic design basics', 'teens', 'creative', 'none', 'long'),
  ('Start journaling daily', 'teens', 'creative', 'basic', 'quick'),
  ('Learn speed reading techniques', 'teens', 'educational', 'basic', 'medium');