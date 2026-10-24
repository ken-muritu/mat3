import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface FavoriteRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  fare: string;
  duration: string;
}

const initialFavorites: FavoriteRoute[] = [
  { id: '1', name: 'Home to Work', origin: 'Thika Town', destination: 'Nairobi CBD', fare: 'KSh 100-150', duration: '1hr 15min' },
  { id: '2', name: 'Work to Home', origin: 'Nairobi CBD', destination: 'Thika Town', fare: 'KSh 100-150', duration: '1hr 15min' },
  { id: '3', name: 'Weekend Trip', origin: 'Nairobi CBD', destination: 'Westlands', fare: 'KSh 30-50', duration: '20 min' },
];

export default function FavoritesScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [favorites, setFavorites] = useState<FavoriteRoute[]>(initialFavorites);

  const handleRemove = (id: string) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this route from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setFavorites(favorites.filter(f => f.id !== id)),
        },
      ]
    );
  };

  const handleBook = (route: FavoriteRoute) => {
    navigation.navigate('Home', {
      screen: 'Booking',
      params: { pickup: route.origin, destination: route.destination },
    });
  };

  const renderItem = ({ item }: { item: FavoriteRoute }) => (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name="heart" size={20} color={colors.primary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.routeName, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.routePath}>
            <Text style={[styles.routeText, { color: colors.textMuted }]}>{item.origin}</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
            <Text style={[styles.routeText, { color: colors.textMuted }]}>{item.destination}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Ionicons name="close-circle" size={24} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="cash-outline" size={16} color={colors.textMuted} />
            <Text style={[styles.statText, { color: colors.textMuted }]}>{item.fare}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={[styles.statText, { color: colors.textMuted }]}>{item.duration}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.bookBtn, { backgroundColor: colors.primary }]}
          onPress={() => handleBook(item)}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No Favorites Yet</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Save your frequent routes for quick booking
            </Text>
            <TouchableOpacity
              style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('Routes')}
            >
              <Text style={styles.exploreBtnText}>Explore Routes</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  routeText: {
    fontSize: 13,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
  },
  bookBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  exploreBtn: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
