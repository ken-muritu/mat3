import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface Trip {
  id: string;
  date: string;
  time: string;
  route: string;
  origin: string;
  destination: string;
  sacco: string;
  vehicle: string;
  fare: number;
  status: 'completed' | 'cancelled';
  rating?: number;
}

const mockTrips: Trip[] = [
  {
    id: '1',
    date: 'Today',
    time: '8:30 AM',
    route: 'Thika - Nairobi CBD',
    origin: 'Thika Town',
    destination: 'Kencom',
    sacco: 'Super Metro',
    vehicle: 'KCB 123A',
    fare: 150,
    status: 'completed',
    rating: 5,
  },
  {
    id: '2',
    date: 'Yesterday',
    time: '6:15 PM',
    route: 'Nairobi CBD - Thika',
    origin: 'Kencom',
    destination: 'Thika Town',
    sacco: '2NK Sacco',
    vehicle: 'KDA 456B',
    fare: 150,
    status: 'completed',
    rating: 4,
  },
  {
    id: '3',
    date: 'Jan 28, 2026',
    time: '7:45 AM',
    route: 'Ruiru - Nairobi CBD',
    origin: 'Ruiru Town',
    destination: 'Kencom',
    sacco: 'Manchester',
    vehicle: 'KDB 789C',
    fare: 80,
    status: 'completed',
    rating: 4,
  },
  {
    id: '4',
    date: 'Jan 27, 2026',
    time: '5:30 PM',
    route: 'Nairobi CBD - Ruiru',
    origin: 'Kencom',
    destination: 'Ruiru Town',
    sacco: 'Super Metro',
    vehicle: 'KCB 234D',
    fare: 80,
    status: 'cancelled',
  },
];

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const filteredTrips = mockTrips.filter((trip) => {
    if (filter === 'all') return true;
    return trip.status === filter;
  });

  const renderTrip = ({ item }: { item: Trip }) => (
    <TouchableOpacity
      style={[styles.tripCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={styles.tripHeader}>
        <View style={styles.tripDate}>
          <Text style={[styles.dateText, { color: colors.text }]}>{item.date}</Text>
          <Text style={[styles.timeText, { color: colors.textMuted }]}>{item.time}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status === 'completed' ? colors.success + '20' : colors.danger + '20' }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: item.status === 'completed' ? colors.success : colors.danger }
          ]}>
            {item.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routePoint}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.locationText, { color: colors.text }]}>{item.origin}</Text>
        </View>
        <View style={[styles.routeLine, { borderColor: colors.border }]} />
        <View style={styles.routePoint}>
          <View style={[styles.dot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.locationText, { color: colors.text }]}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="bus-outline" size={16} color={colors.textMuted} />
          <Text style={[styles.detailText, { color: colors.textMuted }]}>
            {item.sacco} • {item.vehicle}
          </Text>
        </View>
        <Text style={[styles.fareText, { color: colors.primary }]}>KSh {item.fare}</Text>
      </View>

      {item.status === 'completed' && (
        <View style={styles.ratingRow}>
          {item.rating ? (
            <View style={styles.ratingDisplay}>
              <Text style={[styles.ratingLabel, { color: colors.textMuted }]}>Your rating:</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= item.rating! ? 'star' : 'star-outline'}
                    size={16}
                    color={colors.accent}
                  />
                ))}
              </View>
            </View>
          ) : (
            <TouchableOpacity style={[styles.rateBtn, { backgroundColor: colors.accent }]} onPress={() => Alert.alert('Rate Trip', 'How was your trip?', [
                { text: '⭐', onPress: () => Alert.alert('Thanks!', 'Rating submitted') },
                { text: '⭐⭐⭐', onPress: () => Alert.alert('Thanks!', 'Rating submitted') },
                { text: '⭐⭐⭐⭐⭐', onPress: () => Alert.alert('Thanks!', 'Rating submitted') },
              ])}>
              <Ionicons name="star" size={16} color={colors.primaryDark} />
              <Text style={[styles.rateBtnText, { color: colors.primaryDark }]}>Rate Trip</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Filters */}
      <View style={styles.filters}>
        {(['all', 'completed', 'cancelled'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              filter === f && { backgroundColor: colors.primary },
              filter !== f && { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, { color: filter === f ? '#fff' : colors.text }]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {mockTrips.filter(t => t.status === 'completed').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Total Trips</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.accent }]}>
            KSh {mockTrips.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.fare, 0)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Total Spent</Text>
        </View>
      </View>

      {/* Trip List */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTrip}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No trips found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tripCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripDate: {},
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  routeInfo: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  locationText: {
    fontSize: 14,
  },
  routeLine: {
    width: 1,
    height: 16,
    marginLeft: 4,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  fareText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontSize: 13,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 20,
  },
  rateBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
