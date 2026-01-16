import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { ageGroup, recentActivities = [] } = await req.json();

    if (!ageGroup) {
      return new Response(
        JSON.stringify({ error: 'Age group is required' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const ageGroupDescriptions: Record<string, string> = {
      toddlers: 'toddlers (1-3 years old)',
      preschoolers: 'preschoolers (3-5 years old)',
      earlyElementary: 'early elementary children (5-8 years old)',
      lateElementary: 'late elementary children (8-12 years old)',
      teens: 'teenagers (13-18 years old)',
    };

    let prompt = `Generate a UNIQUE, fun, creative, and age-appropriate activity for ${ageGroupDescriptions[ageGroup]}. The activity should be:\n- Safe and suitable for the age group\n- Engaging and fun\n- Can be done at home or nearby\n- Takes 15-60 minutes\n- Requires minimal or common household materials\n- COMPLETELY DIFFERENT from any previously suggested activities`;

    if (recentActivities.length > 0) {
      prompt += `\n\nCRITICAL: You MUST NOT suggest ANY activity that is similar to or resembles these recently used activities. Be creative and think of something COMPLETELY DIFFERENT:\n${recentActivities.slice(0, 30).map((act: string) => `- ${act}`).join('\n')}`;
      prompt += '\n\nDo NOT use similar themes, concepts, or words. Generate something fresh and original.';
    }

    prompt += '\n\nRespond with ONLY the activity description in a single sentence, no extra text or explanation.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a highly creative activity generator for children and teens. Your goal is to generate unique, diverse, and original activities. NEVER repeat or suggest similar activities. Think outside the box and be innovative. Always respond with just the activity description, nothing else.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1.0,
        max_tokens: 100,
        presence_penalty: 0.8,
        frequency_penalty: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate activity' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await response.json();
    const activity = data.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({ activity }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});