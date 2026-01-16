// Script to generate thousands of diverse activities for each age group
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Activity templates for generating variations
const toddlerTemplates = {
  creative: [
    'Make {material} art',
    'Paint with {tool}',
    'Create {item} with {supply}',
    'Decorate {object}',
    'Build {structure} with {material}',
    'Draw {subject} with {tool}',
    'Make collage with {material}',
    'Color {item}',
    'Stamp with {object}',
    'Craft {creation}'
  ],
  physical: [
    'Practice {movement}',
    'Jump like a {animal}',
    'Walk {style}',
    'Dance to {music}',
    'Throw {object}',
    'Kick {item}',
    'Climb on {structure}',
    'Balance on {surface}',
    'Run {direction}',
    'Hop on {foot}'
  ],
  educational: [
    'Sort {items} by {attribute}',
    'Match {things}',
    'Count {objects}',
    'Find all the {color} things',
    'Point to {bodypart}',
    'Name {category}',
    'Learn {concept}',
    'Practice {skill}',
    'Identify {item}',
    'Hunt for {object}'
  ],
  social: [
    'Play {game} with family',
    'Pretend to be {role}',
    'Share {toy}',
    'Help with {chore}',
    'Play {activity} together',
    'Practice {manners}',
    'Role play {scenario}',
    'Take turns with {item}',
    'Care for {toy}',
    'Communicate {emotion}'
  ]
};

const preschoolerTemplates = {
  creative: [
    'Design {project} with {materials}',
    'Make {craft} from {supply}',
    'Build {creation} using {tool}',
    'Paint {subject}',
    'Create your own {item}',
    'Draw {scene}',
    'Craft {object} with {material}',
    'Construct {building}',
    'Sculpt {figure}',
    'Make {decoration}'
  ],
  educational: [
    'Learn about {topic}',
    'Practice {academic_skill}',
    'Solve {puzzle_type}',
    'Complete {activity} worksheet',
    'Identify {concept}',
    'Count to {number}',
    'Write {letter_activity}',
    'Read about {subject}',
    'Explore {science_concept}',
    'Discover {fact}'
  ],
  physical: [
    'Play {outdoor_game}',
    'Practice {sport_skill}',
    'Create {activity} course',
    'Do {exercise}',
    'Learn {movement}',
    'Master {physical_skill}',
    'Try {activity}',
    'Complete {challenge}',
    'Race with {method}',
    'Jump {style}'
  ]
};

const earlyElementaryTemplates = {
  creative: [
    'Design and build {complex_project}',
    'Create {art_project} with {advanced_material}',
    'Make {invention} from {household_items}',
    'Construct {engineering_project}',
    'Craft {detailed_item}',
    'Build {structure_type}',
    'Invent {original_creation}',
    'Design {plan}',
    'Create {media_project}',
    'Develop {game}'
  ],
  educational: [
    'Research {topic}',
    'Study {subject}',
    'Learn {skill_area}',
    'Practice {academic_topic}',
    'Explore {concept}',
    'Investigate {question}',
    'Solve {problem_type}',
    'Calculate {math_concept}',
    'Write {composition_type}',
    'Read about {topic}'
  ]
};

const lateElementaryTemplates = {
  creative: [
    'Produce {media_type} about {topic}',
    'Design {complex_system}',
    'Create {digital_project}',
    'Build {advanced_creation}',
    'Develop {application_idea}',
    'Make {artistic_work}',
    'Engineer {solution}',
    'Construct {project}',
    'Film {video_type}',
    'Compose {creative_work}'
  ],
  educational: [
    'Master {advanced_skill}',
    'Study {subject_area}',
    'Research {complex_topic}',
    'Analyze {concept}',
    'Learn {technology}',
    'Practice {skill}',
    'Explore {field}',
    'Investigate {question}',
    'Calculate {math_problem}',
    'Write {advanced_composition}'
  ]
};

const teenTemplates = {
  creative: [
    'Develop {professional_project}',
    'Create {portfolio_piece}',
    'Design {business_concept}',
    'Produce {content_type}',
    'Build {technical_project}',
    'Make {artistic_creation}',
    'Compose {work}',
    'Film {production}',
    'Create {digital_content}',
    'Design {system}'
  ],
  educational: [
    'Learn {career_skill}',
    'Study {advanced_topic}',
    'Master {professional_skill}',
    'Research {complex_subject}',
    'Develop {competency}',
    'Practice {expertise}',
    'Explore {field}',
    'Prepare for {goal}',
    'Analyze {topic}',
    'Understand {concept}'
  ]
};

// Replacement word banks
const wordBanks = {
  material: ['paper', 'cardboard', 'clay', 'playdough', 'fabric', 'yarn', 'foam', 'wood', 'plastic', 'recycled materials'],
  tool: ['paintbrushes', 'sponges', 'q-tips', 'fingers', 'stamps', 'rollers', 'markers', 'crayons', 'chalk', 'pencils'],
  item: ['pictures', 'cards', 'shapes', 'patterns', 'designs', 'decorations', 'ornaments', 'gifts', 'toys', 'models'],
  supply: ['glue', 'tape', 'scissors', 'stickers', 'paint', 'markers', 'beads', 'string', 'paper', 'fabric'],
  object: ['rocks', 'leaves', 'sticks', 'boxes', 'bottles', 'cans', 'lids', 'buttons', 'shells', 'pinecones'],
  structure: ['towers', 'bridges', 'houses', 'castles', 'forts', 'walls', 'roads', 'tunnels', 'mazes', 'cities'],
  subject: ['animals', 'flowers', 'trees', 'rainbows', 'sunshine', 'clouds', 'stars', 'hearts', 'faces', 'vehicles'],
  creation: ['bookmarks', 'greeting cards', 'puppets', 'masks', 'crowns', 'jewelry', 'decorations', 'toys', 'games', 'instruments'],
  movement: ['jumping', 'hopping', 'skipping', 'galloping', 'crawling', 'rolling', 'spinning', 'twirling', 'marching', 'tip-toeing'],
  animal: ['frog', 'bunny', 'kangaroo', 'bear', 'elephant', 'bird', 'fish', 'snake', 'cat', 'dog'],
  style: ['forward', 'backward', 'sideways', 'on tiptoes', 'in zigzag', 'in circles', 'heel to toe', 'big steps', 'tiny steps', 'on a line'],
  music: ['fast songs', 'slow songs', 'upbeat music', 'classical music', 'childrens songs', 'silly songs', 'animal songs', 'action songs', 'nursery rhymes', 'favorite tunes'],
  items: ['toys', 'blocks', 'buttons', 'crayons', 'socks', 'spoons', 'cups', 'shapes', 'animals', 'vehicles'],
  attribute: ['color', 'size', 'shape', 'texture', 'weight', 'function', 'material', 'age', 'type', 'category'],
  things: ['colors', 'shapes', 'animals', 'sounds', 'pictures', 'objects', 'toys', 'letters', 'numbers', 'sizes'],
  objects: ['fingers', 'toes', 'blocks', 'toys', 'buttons', 'steps', 'claps', 'books', 'animals', 'friends'],
  color: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'white', 'black', 'brown'],
  bodypart: ['nose', 'eyes', 'ears', 'mouth', 'hands', 'feet', 'head', 'belly', 'knees', 'elbows'],
  category: ['animals', 'colors', 'shapes', 'foods', 'vehicles', 'body parts', 'family members', 'toys', 'clothes', 'furniture'],
  concept: ['big vs small', 'hot vs cold', 'wet vs dry', 'up vs down', 'in vs out', 'on vs off', 'fast vs slow', 'loud vs quiet', 'happy vs sad', 'day vs night'],
  skill: ['counting', 'pointing', 'naming', 'matching', 'sorting', 'stacking', 'building', 'drawing', 'singing', 'dancing'],
  game: ['pretend', 'peek-a-boo', 'patty cake', 'chase', 'ball toss', 'hide and seek', 'follow the leader', 'simon says', 'freeze dance', 'musical chairs'],
  role: ['doctor', 'teacher', 'chef', 'parent', 'firefighter', 'police officer', 'mail carrier', 'store clerk', 'farmer', 'veterinarian'],
  toy: ['dolls', 'teddy bears', 'toy cars', 'action figures', 'stuffed animals', 'blocks', 'balls', 'puzzles', 'books', 'instruments'],
  chore: ['putting away toys', 'carrying items', 'wiping tables', 'folding towels', 'watering plants', 'feeding pets', 'sorting laundry', 'setting table', 'picking up', 'dusting'],
  activity: ['cooking', 'gardening', 'cleaning', 'building', 'reading', 'singing', 'dancing', 'art', 'music', 'games'],
  manners: ['saying please', 'saying thank you', 'sharing', 'taking turns', 'using quiet voice', 'waiting patiently', 'asking politely', 'helping others', 'being gentle', 'listening'],
  scenario: ['grocery shopping', 'doctor visit', 'restaurant', 'birthday party', 'school', 'playground', 'library', 'zoo', 'farm', 'beach']
};

async function generateActivitiesForAgeGroup(ageGroup, templates, count, categories) {
  const activities = [];

  for (const [category, templateList] of Object.entries(templates)) {
    const templatesNeeded = Math.ceil(count / Object.keys(templates).length);

    for (let i = 0; i < templatesNeeded; i++) {
      const template = templateList[i % templateList.length];

      // Replace placeholders with random words from word banks
      let activity = template;
      const placeholders = activity.match(/\{(\w+)\}/g);

      if (placeholders) {
        placeholders.forEach(placeholder => {
          const key = placeholder.replace(/[{}]/g, '');
          if (wordBanks[key]) {
            const randomWord = wordBanks[key][Math.floor(Math.random() * wordBanks[key].length)];
            activity = activity.replace(placeholder, randomWord);
          }
        });
      }

      const materials = ['none', 'basic', 'moderate', 'extensive'];
      const durations = ['quick', 'medium', 'long'];

      activities.push({
        activity,
        age_group: ageGroup,
        category,
        materials_needed: materials[Math.floor(Math.random() * materials.length)],
        duration: durations[Math.floor(Math.random() * durations.length)]
      });

      if (activities.length >= count) break;
    }

    if (activities.length >= count) break;
  }

  return activities.slice(0, count);
}

async function seedDatabase() {
  console.log('Starting to seed database with activities...');

  // Generate activities for each age group
  const toddlerActivities = await generateActivitiesForAgeGroup('toddlers', toddlerTemplates, 1000);
  const preschoolerActivities = await generateActivitiesForAgeGroup('preschoolers', preschoolerTemplates, 1000);
  const earlyElementaryActivities = await generateActivitiesForAgeGroup('earlyElementary', earlyElementaryTemplates, 1000);
  const lateElementaryActivities = await generateActivitiesForAgeGroup('lateElementary', lateElementaryTemplates, 1000);
  const teenActivities = await generateActivitiesForAgeGroup('teens', teenTemplates, 1000);

  const allActivities = [
    ...toddlerActivities,
    ...preschoolerActivities,
    ...earlyElementaryActivities,
    ...lateElementaryActivities,
    ...teenActivities
  ];

  console.log(`Generated ${allActivities.length} activities`);

  // Insert in batches of 100
  const batchSize = 100;
  for (let i = 0; i < allActivities.length; i += batchSize) {
    const batch = allActivities.slice(i, i + batchSize);
    const { error } = await supabase
      .from('activities')
      .insert(batch);

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
    } else {
      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(allActivities.length / batchSize)}`);
    }
  }

  console.log('Database seeding complete!');

  // Verify counts
  const { data, error } = await supabase
    .from('activities')
    .select('age_group')
    .select('age_group');

  if (!error) {
    const counts = {};
    data.forEach(row => {
      counts[row.age_group] = (counts[row.age_group] || 0) + 1;
    });
    console.log('Final counts by age group:', counts);
  }
}

seedDatabase().catch(console.error);
