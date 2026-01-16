import { supabase, Favorite, isSupabaseConfigured } from './supabase';

export async function getFavorites(): Promise<string[]> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem("activityJarFavorites");
      return saved ? JSON.parse(saved) : [];
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem("activityJarFavorites");
      return saved ? JSON.parse(saved) : [];
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('activity')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      const saved = localStorage.getItem("activityJarFavorites");
      return saved ? JSON.parse(saved) : [];
    }

    return data.map((fav: Favorite) => fav.activity);
  } catch (error) {
    console.error('Unexpected error in getFavorites:', error);
    const saved = localStorage.getItem("activityJarFavorites");
    return saved ? JSON.parse(saved) : [];
  }
}

export async function addFavorite(activity: string, ageGroup: string): Promise<boolean> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      if (!favorites.includes(activity)) {
        favorites.push(activity);
        localStorage.setItem("activityJarFavorites", JSON.stringify(favorites));
      }
      return true;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      if (!favorites.includes(activity)) {
        favorites.push(activity);
        localStorage.setItem("activityJarFavorites", JSON.stringify(favorites));
      }
      return true;
    }

    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: user.id, activity, age_group: ageGroup }]);

    if (error) {
      console.error('Error adding favorite:', error);
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      if (!favorites.includes(activity)) {
        favorites.push(activity);
        localStorage.setItem("activityJarFavorites", JSON.stringify(favorites));
      }
      return true;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in addFavorite:', error);
    const saved = localStorage.getItem("activityJarFavorites");
    const favorites = saved ? JSON.parse(saved) : [];
    if (!favorites.includes(activity)) {
      favorites.push(activity);
      localStorage.setItem("activityJarFavorites", JSON.stringify(favorites));
    }
    return true;
  }
}

export async function removeFavorite(activity: string): Promise<boolean> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      const updated = favorites.filter((fav: string) => fav !== activity);
      localStorage.setItem("activityJarFavorites", JSON.stringify(updated));
      return true;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      const updated = favorites.filter((fav: string) => fav !== activity);
      localStorage.setItem("activityJarFavorites", JSON.stringify(updated));
      return true;
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('activity', activity);

    if (error) {
      console.error('Error removing favorite:', error);
      const saved = localStorage.getItem("activityJarFavorites");
      const favorites = saved ? JSON.parse(saved) : [];
      const updated = favorites.filter((fav: string) => fav !== activity);
      localStorage.setItem("activityJarFavorites", JSON.stringify(updated));
      return true;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in removeFavorite:', error);
    const saved = localStorage.getItem("activityJarFavorites");
    const favorites = saved ? JSON.parse(saved) : [];
    const updated = favorites.filter((fav: string) => fav !== activity);
    localStorage.setItem("activityJarFavorites", JSON.stringify(updated));
    return true;
  }
}

export async function getRecentActivities(ageGroup: string, limit: number = 20): Promise<string[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const saved = localStorage.getItem("activityJarHistory");
    const history = saved ? JSON.parse(saved) : [];
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const recentHistory = history.filter((item: any) =>
      item.ageGroup === ageGroup &&
      item.timestamp &&
      item.timestamp > oneDayAgo
    );
    return recentHistory.slice(0, limit).map((item: any) => item.activity);
  }

  const { data, error } = await supabase
    .from('activity_history')
    .select('activity')
    .eq('user_id', user.id)
    .eq('age_group', ageGroup)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching activity history:', error);
    return [];
  }

  return data.map((item: any) => item.activity);
}

export async function saveActivityHistory(
  activity: string,
  ageGroup: string,
  isAiGenerated: boolean
): Promise<void> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem("activityJarHistory");
      const history = saved ? JSON.parse(saved) : [];
      history.unshift({ activity, ageGroup, isAiGenerated, timestamp: Date.now() });
      if (history.length > 20) history.pop();
      localStorage.setItem("activityJarHistory", JSON.stringify(history));
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem("activityJarHistory");
      const history = saved ? JSON.parse(saved) : [];
      history.unshift({ activity, ageGroup, isAiGenerated, timestamp: Date.now() });
      if (history.length > 20) history.pop();
      localStorage.setItem("activityJarHistory", JSON.stringify(history));
      return;
    }

    const { error } = await supabase
      .from('activity_history')
      .insert([{
        user_id: user.id,
        activity,
        age_group: ageGroup,
        is_ai_generated: isAiGenerated
      }]);

    if (error) {
      console.error('Error saving activity history:', error);
    }
  } catch (error) {
    console.error('Unexpected error in saveActivityHistory:', error);
    const saved = localStorage.getItem("activityJarHistory");
    const history = saved ? JSON.parse(saved) : [];
    history.unshift({ activity, ageGroup, isAiGenerated, timestamp: Date.now() });
    if (history.length > 20) history.pop();
    localStorage.setItem("activityJarHistory", JSON.stringify(history));
  }
}

interface ActivityWithId {
  id: string;
  activity: string;
}

async function getShownActivityIds(ageGroup: string): Promise<string[]> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem(`shownActivities_${ageGroup}`);
      return saved ? JSON.parse(saved) : [];
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem(`shownActivities_${ageGroup}`);
      return saved ? JSON.parse(saved) : [];
    }

    const { data, error } = await supabase
      .from('shown_activities')
      .select('activity_id')
      .eq('user_id', user.id)
      .eq('age_group', ageGroup);

    if (error) {
      console.error('Error fetching shown activities:', error);
      return [];
    }

    return data.map(item => item.activity_id);
  } catch (error) {
    console.error('Unexpected error in getShownActivityIds:', error);
    return [];
  }
}

async function markActivityAsShown(activityId: string, ageGroup: string): Promise<void> {
  try {
    if (!isSupabaseConfigured) {
      const saved = localStorage.getItem(`shownActivities_${ageGroup}`);
      const shownIds = saved ? JSON.parse(saved) : [];
      if (!shownIds.includes(activityId)) {
        shownIds.push(activityId);
        localStorage.setItem(`shownActivities_${ageGroup}`, JSON.stringify(shownIds));
      }
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const saved = localStorage.getItem(`shownActivities_${ageGroup}`);
      const shownIds = saved ? JSON.parse(saved) : [];
      if (!shownIds.includes(activityId)) {
        shownIds.push(activityId);
        localStorage.setItem(`shownActivities_${ageGroup}`, JSON.stringify(shownIds));
      }
      return;
    }

    const { error } = await supabase
      .from('shown_activities')
      .insert([{
        user_id: user.id,
        age_group: ageGroup,
        activity_id: activityId
      }]);

    if (error) {
      console.error('Error marking activity as shown:', error);
    }
  } catch (error) {
    console.error('Unexpected error in markActivityAsShown:', error);
  }
}

async function resetShownActivities(ageGroup: string): Promise<void> {
  try {
    if (!isSupabaseConfigured) {
      localStorage.removeItem(`shownActivities_${ageGroup}`);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      localStorage.removeItem(`shownActivities_${ageGroup}`);
      return;
    }

    const { error } = await supabase
      .from('shown_activities')
      .delete()
      .eq('user_id', user.id)
      .eq('age_group', ageGroup);

    if (error) {
      console.error('Error resetting shown activities:', error);
    }
  } catch (error) {
    console.error('Unexpected error in resetShownActivities:', error);
  }
}

export async function getRandomActivityFromDatabase(
  ageGroup: string,
  _recentActivities: string[]
): Promise<string | null> {
  try {
    console.log('[getRandomActivityFromDatabase] Starting for age group:', ageGroup);

    const shownActivityIds = await getShownActivityIds(ageGroup);
    console.log('[getRandomActivityFromDatabase] Shown activity IDs count:', shownActivityIds.length);

    const { data: allActivities, error } = await supabase
      .from('activities')
      .select('id, activity')
      .eq('age_group', ageGroup);

    if (error) {
      console.error('[getRandomActivityFromDatabase] Database error:', error);
      return null;
    }

    if (!allActivities || allActivities.length === 0) {
      console.error('[getRandomActivityFromDatabase] No activities found for age group:', ageGroup);
      return null;
    }

    console.log('[getRandomActivityFromDatabase] Total activities in database:', allActivities.length);

    const unseenActivities = allActivities.filter(
      (activity: ActivityWithId) => !shownActivityIds.includes(activity.id)
    );

    console.log('[getRandomActivityFromDatabase] Unseen activities count:', unseenActivities.length);

    if (unseenActivities.length === 0) {
      console.log('[getRandomActivityFromDatabase] All activities shown! Resetting cycle.');
      await resetShownActivities(ageGroup);
      const randomIndex = Math.floor(Math.random() * allActivities.length);
      const selectedActivity = allActivities[randomIndex];
      await markActivityAsShown(selectedActivity.id, ageGroup);
      console.log('[getRandomActivityFromDatabase] Selected (after reset):', selectedActivity.activity);
      return selectedActivity.activity;
    }

    const randomIndex = Math.floor(Math.random() * unseenActivities.length);
    const selectedActivity = unseenActivities[randomIndex];
    await markActivityAsShown(selectedActivity.id, ageGroup);

    console.log(`[getRandomActivityFromDatabase] Progress: ${shownActivityIds.length + 1}/${allActivities.length}`);
    console.log('[getRandomActivityFromDatabase] Selected activity:', selectedActivity.activity);

    return selectedActivity.activity;
  } catch (error) {
    console.error('[getRandomActivityFromDatabase] Unexpected error:', error);
    return null;
  }
}
