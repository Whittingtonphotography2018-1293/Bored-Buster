import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  saveActivityHistory,
  getRandomActivityFromDatabase,
} from './lib/database';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = Math.min(width * 0.7, 280);

export default function ActivityJar() {
  const [ageGroup, setAgeGroup] = useState('');
  const [activity, setActivity] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [lastShake, setLastShake] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    loadFavorites();
    setupAccelerometer();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  const setupAccelerometer = () => {
    Accelerometer.setUpdateInterval(100);

    const sub = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const threshold = 2.5;
      const now = Date.now();

      if (acceleration > threshold && now - lastShake > 1000 && !isShaking && ageGroup) {
        setLastShake(now);
        generateActivity();
      }
    });

    setSubscription(sub);
  };

  const activities: Record<string, string[]> = {
    toddlers: [
      "Play 'Eye Spy' with colors",
      'Build a tower with blocks',
      'Draw with sidewalk chalk',
      'Have a mini dance party',
      'Play animal sounds guessing game',
    ],
    preschoolers: [
      "Play 'Would You Rather'",
      'Create a puppet show',
      'Go on a backyard scavenger hunt',
      'Make paper airplanes and race them',
      'Draw your dream house',
    ],
    earlyElementary: [
      'DIY craft challenge with recycled items',
      'Invent a new board game',
      'Write a short story together',
      'Set up an obstacle course',
      "Try a 'Minute to Win It' mini game",
    ],
    lateElementary: [
      'Create a short film or skit',
      'Host a cooking challenge',
      'Make a vision board',
      'Draw or design a digital comic',
      'Try a science experiment',
    ],
    teens: [
      'Create a short film or skit',
      'Host a cooking challenge',
      'Make a vision board',
      'Draw or design a digital comic',
      "Do a 'no-internet' challenge for one hour",
    ],
  };

  const generateActivity = async () => {
    if (!ageGroup) {
      setShowSettings(true);
      return;
    }
    setIsShaking(true);
    setIsGenerating(true);

    try {
      const dbActivity = await getRandomActivityFromDatabase(ageGroup, []);

      if (dbActivity) {
        setActivity(dbActivity);
        await saveActivityHistory(dbActivity, ageGroup, false);
        setIsShaking(false);
        setIsGenerating(false);
        setShowActivity(true);
        return;
      }

      const list = activities[ageGroup];
      const randomItem = list[Math.floor(Math.random() * list.length)];

      setActivity(randomItem);
      await saveActivityHistory(randomItem, ageGroup, false);
      setIsShaking(false);
      setIsGenerating(false);
      setShowActivity(true);
    } catch (error) {
      console.error('Error generating activity:', error);

      const list = activities[ageGroup];
      const randomItem = list[Math.floor(Math.random() * list.length)];

      setActivity(randomItem);
      await saveActivityHistory(randomItem, ageGroup, false);
      setIsShaking(false);
      setIsGenerating(false);
      setShowActivity(true);
    }
  };

  const addToFavorites = async () => {
    if (activity && !favorites.includes(activity)) {
      const success = await addFavorite(activity, ageGroup);
      if (success) {
        setFavorites([...favorites, activity]);
      }
    }
  };

  const handleRemoveFavorite = async (item: string) => {
    const success = await removeFavorite(item);
    if (success) {
      setFavorites(favorites.filter(fav => fav !== item));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.nav}>
        <Image
          source={require('../public/generated-image-1767102612082.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.navButtons}>
          <TouchableOpacity
            onPress={() => setShowSettings(!showSettings)}
            style={styles.navButton}
          >
            <Text style={styles.navIcon}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFavorites(!showFavorites)}
            style={styles.navButton}
          >
            <Text style={styles.navIcon}>❤️</Text>
            {favorites.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>Bored? Not anymore!</Text>
        <Text style={styles.subtitle}>AI creates unique activities just for you</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={generateActivity}
            disabled={isShaking}
            style={[
              styles.shakeButton,
              isShaking && styles.shakeButtonDisabled,
            ]}
          >
            <Text style={styles.sparkleIcon}>✨</Text>
            <Text style={styles.shakeButtonText}>
              {isGenerating ? 'Thinking...' : 'Shake!'}
            </Text>
            <Text style={styles.shakeButtonSubtext}>
              {isGenerating ? 'AI is creating' : 'for a fun idea'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hintContainer}>
          <Text style={styles.phoneIcon}>📱</Text>
          <Text style={styles.hintText}>You can also shake your phone!</Text>
        </View>
      </View>

      <Modal
        visible={showSettings}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSettings(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Age Group</Text>
            <ScrollView style={styles.optionsContainer}>
              {[
                { value: 'toddlers', label: 'Ages 1–3 (Toddlers)' },
                { value: 'preschoolers', label: 'Ages 3–5 (Preschoolers)' },
                { value: 'earlyElementary', label: 'Ages 5–8 (Early Elementary)' },
                { value: 'lateElementary', label: 'Ages 8–12 (Late Elementary)' },
                { value: 'teens', label: 'Ages 13+ (Teens)' },
              ].map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    setAgeGroup(option.value);
                    setShowSettings(false);
                  }}
                  style={[
                    styles.option,
                    ageGroup === option.value && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      ageGroup === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowSettings(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showActivity}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowActivity(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActivity(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Activity Idea</Text>
            <Text style={styles.activityText}>{activity}</Text>
            <View style={styles.activityButtons}>
              <TouchableOpacity
                onPress={addToFavorites}
                disabled={favorites.includes(activity)}
                style={[
                  styles.favoriteButton,
                  favorites.includes(activity) && styles.favoriteButtonDisabled,
                ]}
              >
                <Text style={styles.favoriteButtonText}>
                  {favorites.includes(activity) ? 'Saved' : 'Save'} ❤️
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowActivity(false);
                  setTimeout(generateActivity, 300);
                }}
                style={styles.anotherButton}
              >
                <Text style={styles.anotherButtonText}>Get Another</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showFavorites}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFavorites(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFavorites(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Favorites</Text>
            {favorites.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No favorites yet. Generate activities and save the ones you love!
                </Text>
              </View>
            ) : (
              <ScrollView style={styles.favoritesContainer}>
                {favorites.map((item, i) => (
                  <View key={i} style={styles.favoriteItem}>
                    <Text style={styles.favoriteItemText}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveFavorite(item)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              onPress={() => setShowFavorites(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 50,
    width: 120,
  },
  navButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  navButton: {
    padding: 8,
    position: 'relative',
  },
  navIcon: {
    fontSize: 28,
    color: '#2c3e50',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F06292',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 40,
  },
  shakeButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#FF6B6B',
    borderWidth: 8,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 20,
  },
  shakeButtonDisabled: {
    opacity: 0.7,
  },
  sparkleIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  shakeButtonText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  shakeButtonSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
  },
  phoneIcon: {
    fontSize: 18,
  },
  hintText: {
    color: '#7f8c8d',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 24,
  },
  optionsContainer: {
    maxHeight: 400,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: '#F06292',
    backgroundColor: '#fce4ec',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  activityText: {
    fontSize: 20,
    color: '#34495e',
    lineHeight: 32,
    marginBottom: 24,
  },
  activityButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  favoriteButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#FF6B6B',
    flex: 1,
    alignItems: 'center',
  },
  favoriteButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  anotherButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F06292',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  anotherButtonText: {
    color: '#F06292',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#7f8c8d',
    textAlign: 'center',
    fontSize: 16,
  },
  favoritesContainer: {
    maxHeight: 400,
  },
  favoriteItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  favoriteItemText: {
    flex: 1,
    color: '#34495e',
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#95a5a6',
    fontSize: 24,
    lineHeight: 24,
  },
});
