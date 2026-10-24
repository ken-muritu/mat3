import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const nearbyMatatus = [
  { id: 1, sacco: 'Super Metro', route: 'Thika - CBD', eta: 3, fare: 100, rating: 4.8 },
  { id: 2, sacco: '2NK Sacco', route: 'Thika - CBD', eta: 7, fare: 100, rating: 4.5 },
  { id: 3, sacco: 'Kenya Mpya', route: 'Thika - CBD', eta: 12, fare: 90, rating: 4.6 },
];

const quickActions = [
  { id: 1, icon: 'navigate', label: 'Book Ride', color: '#006B3F', screen: 'Booking' },
  { id: 2, icon: 'map', label: 'Routes', color: '#1E3A5F', tab: 'Routes' },
  { id: 3, icon: 'wallet', label: 'Wallet', color: '#FFB800', tab: 'Wallet' },
  { id: 4, icon: 'shield-checkmark', label: 'Safety', color: '#22C55E', screen: 'Safety' },
];

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textMuted }]}>
              {getGreeting()}
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              Welcome to Ma3
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.notificationBtn, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Profile', { screen: 'Settings' })}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => navigation.navigate('Booking')}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <Text style={[styles.searchPlaceholder, { color: colors.textMuted }]}>
            Where are you going?
          </Text>
          <View style={[styles.searchIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id} 
              style={[styles.quickAction, { backgroundColor: colors.surface }]}
              onPress={() => {
                if (action.screen) {
                  navigation.navigate(action.screen);
                } else if (action.tab) {
                  navigation.getParent()?.navigate(action.tab);
                }
              }}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text style={[styles.quickActionLabel, { color: colors.text }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Matatus */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Nearby Matatus
            </Text>
            <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Routes')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>

          {nearbyMatatus.map((matatu) => (
            <TouchableOpacity
              key={matatu.id}
              style={[styles.matatuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => navigation.navigate('Booking')}
            >
              <View style={[styles.matatuIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="bus" size={24} color={colors.primary} />
              </View>
              <View style={styles.matatuInfo}>
                <Text style={[styles.matatuSacco, { color: colors.text }]}>
                  {matatu.sacco}
                </Text>
                <Text style={[styles.matatuRoute, { color: colors.textMuted }]}>
                  {matatu.route}
                </Text>
                <View style={styles.matatuMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={colors.accent} />
                    <Text style={[styles.metaText, { color: colors.textMuted }]}>
                      {matatu.eta} min
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={14} color={colors.accent} />
                    <Text style={[styles.metaText, { color: colors.textMuted }]}>
                      {matatu.rating}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.matatuFare}>
                <Text style={[styles.fareAmount, { color: colors.primary }]}>
                  KSh {matatu.fare}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Banner */}
        <View style={[styles.promoBanner, { backgroundColor: colors.primary }]}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>First Ride Free!</Text>
            <Text style={styles.promoSubtitle}>
              Use code KARIBU for your first ride
            </Text>
            <TouchableOpacity style={styles.promoButton} onPress={() => navigation.getParent()?.navigate('Wallet')}>
              <Text style={styles.promoButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="gift" size={60} color="rgba(255,255,255,0.3)" />
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Trips
          </Text>
          <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
            <Ionicons name="time-outline" size={40} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No recent trips yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textMuted }]}>
              Book your first ride to get started
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickAction: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    width: (width - 60) / 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  matatuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  matatuIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matatuInfo: {
    flex: 1,
    marginLeft: 12,
  },
  matatuSacco: {
    fontSize: 16,
    fontWeight: '600',
  },
  matatuRoute: {
    fontSize: 13,
    marginTop: 2,
  },
  matatuMeta: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  matatuFare: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  promoButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  promoButtonText: {
    color: '#004D2D',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
  },
});
