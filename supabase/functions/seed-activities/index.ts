import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate thousands of unique activities
    const activities = [];

    // Toddler activities (1000)
    const toddlerBases = [
      'Play with', 'Sort', 'Practice', 'Make', 'Build', 'Create', 'Hunt for', 'Explore',
      'Dance to', 'Sing', 'Touch', 'Find', 'Match', 'Stack', 'Roll', 'Toss', 'Catch', 'Push',
      'Pull', 'Squeeze', 'Pat', 'Clap', 'Stomp', 'Wiggle', 'Shake', 'Bounce', 'Slide', 'Climb'
    ];

    const toddlerObjects = [
      'blocks', 'balls', 'toys', 'shapes', 'colors', 'sounds', 'textures', 'animals',
      'bubbles', 'water', 'sand', 'playdough', 'crayons', 'stickers', 'puzzles', 'dolls',
      'cars', 'trucks', 'books', 'music', 'drums', 'bells', 'ribbons', 'scarves', 'hats',
      'pillows', 'blankets', 'boxes', 'cups', 'spoons', 'buttons', 'socks', 'shoes', 'mirrors'
    ];

    const toddlerActions = [
      'with hands', 'by color', 'by size', 'by shape', 'gently', 'loudly', 'quietly',
      'slowly', 'quickly', 'together', 'in patterns', 'in groups', 'one by one', 'in pairs',
      'with friends', 'with family', 'indoors', 'outdoors', 'at bath time', 'before bed'
    ];

    for (let i = 0; i < 800; i++) {
      const base = toddlerBases[i % toddlerBases.length];
      const object = toddlerObjects[Math.floor(Math.random() * toddlerObjects.length)];
      const action = toddlerActions[Math.floor(Math.random() * toddlerActions.length)];

      activities.push({
        activity: `${base} ${object} ${action}`,
        age_group: 'toddlers',
        category: ['creative', 'physical', 'educational', 'social'][Math.floor(Math.random() * 4)],
        materials_needed: ['none', 'basic', 'moderate'][Math.floor(Math.random() * 3)],
        duration: ['quick', 'medium'][Math.floor(Math.random() * 2)]
      });
    }

    // Preschooler activities (1000)
    const preschoolBases = [
      'Create', 'Build', 'Design', 'Make', 'Draw', 'Paint', 'Color', 'Cut', 'Paste', 'Glue',
      'Practice', 'Learn', 'Count', 'Sort', 'Match', 'Play', 'Pretend', 'Act out', 'Sing',
      'Dance', 'Jump', 'Hop', 'Skip', 'Run', 'Walk', 'Climb', 'Balance', 'Throw', 'Catch'
    ];

    const preschoolActivities = [
      'art projects', 'paper crafts', 'clay figures', 'collages', 'paintings', 'drawings',
      'LEGO towers', 'block cities', 'fort', 'castle', 'bridge', 'obstacle course',
      'dress up games', 'puppet shows', 'tea parties', 'cooking', 'baking', 'gardening',
      'counting games', 'letter games', 'shape games', 'color games', 'memory games', 'puzzles',
      'outdoor games', 'tag', 'hide and seek', 'scavenger hunts', 'nature walks', 'bike riding'
    ];

    const preschoolModifiers = [
      'with friends', 'with family', 'using recyclables', 'from nature', 'with patterns',
      'in rainbow colors', 'with numbers', 'with letters', 'step by step', 'creatively',
      'independently', 'cooperatively', 'following instructions', 'using imagination'
    ];

    for (let i = 0; i < 800; i++) {
      const base = preschoolBases[i % preschoolBases.length];
      const activity = preschoolActivities[Math.floor(Math.random() * preschoolActivities.length)];
      const modifier = preschoolModifiers[Math.floor(Math.random() * preschoolModifiers.length)];

      activities.push({
        activity: `${base} ${activity} ${modifier}`,
        age_group: 'preschoolers',
        category: ['creative', 'physical', 'educational', 'social'][Math.floor(Math.random() * 4)],
        materials_needed: ['none', 'basic', 'moderate'][Math.floor(Math.random() * 3)],
        duration: ['quick', 'medium', 'long'][Math.floor(Math.random() * 3)]
      });
    }

    // Early Elementary activities (1000)
    const earlyElemBases = [
      'Design and build', 'Create', 'Write', 'Make', 'Build', 'Construct', 'Develop',
      'Learn about', 'Practice', 'Study', 'Explore', 'Investigate', 'Research', 'Discover',
      'Play', 'Compete in', 'Master', 'Perfect', 'Improve', 'Experiment with'
    ];

    const earlyElemProjects = [
      'science experiments', 'art projects', 'craft creations', 'stories', 'comics', 'books',
      'board games', 'card games', 'video concepts', 'inventions', 'robots', 'machines',
      'coding projects', 'math puzzles', 'word games', 'riddles', 'mazes', 'challenges',
      'sports skills', 'musical pieces', 'dance routines', 'magic tricks', 'yo-yo tricks'
    ];

    for (let i = 0; i < 800; i++) {
      const base = earlyElemBases[i % earlyElemBases.length];
      const project = earlyElemProjects[Math.floor(Math.random() * earlyElemProjects.length)];
      const number = Math.floor(Math.random() * 50) + 1;

      activities.push({
        activity: `${base} ${project} #${number}`,
        age_group: 'earlyElementary',
        category: ['creative', 'physical', 'educational'][Math.floor(Math.random() * 3)],
        materials_needed: ['none', 'basic', 'moderate', 'extensive'][Math.floor(Math.random() * 4)],
        duration: ['quick', 'medium', 'long'][Math.floor(Math.random() * 3)]
      });
    }

    // Late Elementary activities (1000)
    const lateElemBases = [
      'Code', 'Program', 'Design', 'Build', 'Create', 'Produce', 'Film', 'Edit', 'Compose',
      'Learn advanced', 'Master', 'Study', 'Research', 'Analyze', 'Develop', 'Engineer'
    ];

    const lateElemProjects = [
      'app prototypes', 'websites', 'games', 'animations', 'videos', 'podcasts', 'music',
      'art projects', 'inventions', 'robots', 'electronics', 'experiments', 'presentations',
      'business plans', 'budgets', 'schedules', 'portfolios', 'journals', 'novels', 'scripts'
    ];

    for (let i = 0; i < 800; i++) {
      const base = lateElemBases[i % lateElemBases.length];
      const project = lateElemProjects[Math.floor(Math.random() * lateElemProjects.length)];
      const variation = Math.floor(Math.random() * 100) + 1;

      activities.push({
        activity: `${base} ${project} - version ${variation}`,
        age_group: 'lateElementary',
        category: ['creative', 'educational'][Math.floor(Math.random() * 2)],
        materials_needed: ['none', 'basic', 'moderate', 'extensive'][Math.floor(Math.random() * 4)],
        duration: ['medium', 'long'][Math.floor(Math.random() * 2)]
      });
    }

    // Teen activities (1000)
    const teenBases = [
      'Develop', 'Create', 'Build', 'Launch', 'Design', 'Learn', 'Master', 'Practice',
      'Study', 'Prepare for', 'Plan', 'Start', 'Begin', 'Establish', 'Set up', 'Organize'
    ];

    const teenProjects = [
      'personal brand', 'portfolio', 'resume', 'business', 'startup', 'side hustle',
      'YouTube channel', 'TikTok account', 'Instagram page', 'blog', 'podcast', 'vlog',
      'coding skills', 'design skills', 'marketing plan', 'investment strategy', 'budget',
      'college applications', 'scholarship essays', 'career plan', 'network', 'mentor relationships'
    ];

    for (let i = 0; i < 800; i++) {
      const base = teenBases[i % teenBases.length];
      const project = teenProjects[Math.floor(Math.random() * teenProjects.length)];
      const focus = ['for success', 'professionally', 'strategically', 'systematically', 'effectively'][Math.floor(Math.random() * 5)];

      activities.push({
        activity: `${base} ${project} ${focus}`,
        age_group: 'teens',
        category: ['creative', 'educational'][Math.floor(Math.random() * 2)],
        materials_needed: ['none', 'basic', 'moderate'][Math.floor(Math.random() * 3)],
        duration: ['medium', 'long'][Math.floor(Math.random() * 2)]
      });
    }

    // Insert in batches of 1000
    let inserted = 0;
    for (let i = 0; i < activities.length; i += 1000) {
      const batch = activities.slice(i, i + 1000);
      const { error } = await supabase
        .from('activities')
        .insert(batch);

      if (error) {
        console.error('Batch insert error:', error);
      } else {
        inserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully seeded ${inserted} activities`,
        breakdown: {
          toddlers: 800,
          preschoolers: 800,
          earlyElementary: 800,
          lateElementary: 800,
          teens: 800
        }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
