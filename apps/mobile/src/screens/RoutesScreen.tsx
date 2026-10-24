import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const routes = [
  {
    id: 'thika-nairobi',
    name: 'Thika - Nairobi CBD',
    origin: 'Thika Town',
    destination: 'Kencom',
    distance: '45 km',
    duration: '1hr 15min',
    fare: 'KSh 100-150',
    rating: 4.5,
    popular: true,
  },
  {
    id: 'thika-muranga',
    name: "Thika - Murang'a",
    origin: 'Thika Town',
    destination: "Murang'a",
    distance: '55 km',
    duration: '1hr 30min',
    fare: 'KSh 150-200',
    rating: 4.2,
    popular: false,
  },
  {
    id: 'ruiru-cbd',
    name: 'Ruiru - Nairobi CBD',
    origin: 'Ruiru Town',
    destination: 'Kencom',
    distance: '25 km',
    duration: '45 min',
    fare: 'KSh 70-100',
    rating: 4.4,
    popular: true,
  },
  {
    id: 'juja-cbd',
    name: 'Juja - Nairobi CBD',
    origin: 'Juja Town',
    destination: 'Kencom',
    distance: '35 km',
    duration: '1hr',
    fare: 'KSh 80-120',
    rating: 4.3,
    popular: true,
  },
  {
    id: 'westlands-cbd',
    name: 'Westlands - Nairobi CBD',
    origin: 'Westlands',
    destination: 'Kencom',
    distance: '5 km',
    duration: '20 min',
    fare: 'KSh 30-50',
    rating: 4.6,
    popular: true,
  },
  {
    id: 'eastleigh-cbd',
    name: 'Eastleigh - Nairobi CBD',
    origin: 'Eastleigh',
    destination: 'Kencom',
    distance: '8 km',
    duration: '25 min',
    fare: 'KSh 30-50',
    rating: 4.1,
    popular: true,
  },
  {
    id: 'ongata-rongai-cbd',
    name: 'Ongata Rongai - CBD',
    origin: 'Ongata Rongai',
    destination: 'Railway Station',
    distance: '22 km',
    duration: '50 min',
    fare: 'KSh 80-100',
    rating: 4.3,
    popular: true,
  },
  {
    id: 'kitengela-cbd',
    name: 'Kitengela - Nairobi CBD',
    origin: 'Kitengela',
    destination: 'Kencom',
    distance: '30 km',
    duration: '1hr',
    fare: 'KSh 100-150',
    rating: 4.2,
    popular: true,
  },
  {
    id: 'ngong-cbd',
    name: 'Ngong - Nairobi CBD',
    origin: 'Ngong Town',
    destination: 'Kencom',
    distance: '25 km',
    duration: '45 min',
    fare: 'KSh 70-100',
    rating: 4.4,
    popular: false,
  },
  {
    id: 'karen-cbd',
    name: 'Karen - Nairobi CBD',
    origin: 'Karen',
    destination: 'Kencom',
    distance: '18 km',
    duration: '40 min',
    fare: 'KSh 50-80',
    rating: 4.5,
    popular: false,
  },
  {
    id: 'kasarani-cbd',
    name: 'Kasarani - Nairobi CBD',
    origin: 'Kasarani',
    destination: 'Kencom',
    distance: '12 km',
    duration: '35 min',
    fare: 'KSh 50-70',
    rating: 4.3,
    popular: true,
  },
  {
    id: 'githurai-cbd',
    name: 'Githurai 45 - CBD',
    origin: 'Githurai 45',
    destination: 'Kencom',
    distance: '15 km',
    duration: '40 min',
    fare: 'KSh 50-80',
    rating: 4.2,
    popular: true,
  },
  {
    id: 'embakasi-cbd',
    name: 'Embakasi - Nairobi CBD',
    origin: 'Embakasi',
    destination: 'Kencom',
    distance: '14 km',
    duration: '35 min',
    fare: 'KSh 50-70',
    rating: 4.4,
    popular: false,
  },
  {
    id: 'kiambu-cbd',
    name: 'Kiambu - Nairobi CBD',
    origin: 'Kiambu Town',
    destination: 'Kencom',
    distance: '16 km',
    duration: '40 min',
    fare: 'KSh 60-80',
    rating: 4.3,
    popular: false,
  },
  {
    id: 'limuru-cbd',
    name: 'Limuru - Nairobi CBD',
    origin: 'Limuru',
    destination: 'Kencom',
    distance: '35 km',
    duration: '1hr',
    fare: 'KSh 100-130',
    rating: 4.1,
    popular: false,
  },
];

export default function RoutesScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'popular') return matchesSearch && route.popular;
    return matchesSearch;
  });

  const renderRoute = ({ item }: { item: typeof routes[0] }) => (
    <TouchableOpacity
      style={[styles.routeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={styles.routeHeader}>
        <Text style={[styles.routeName, { color: colors.text }]}>{item.name}</Text>
        {item.popular && (
          <View style={[styles.popularBadge, { backgroundColor: colors.accent + '30' }]}>
            <Text style={[styles.popularText, { color: colors.accentDark }]}>Popular</Text>
          </View>
        )}
      </View>

      <View style={styles.routePath}>
        <View style={styles.pathPoint}>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.pathText, { color: colors.text }]}>{item.origin}</Text>
        </View>
        <View style={[styles.pathLine, { borderColor: colors.border }]} />
        <View style={styles.pathPoint}>
          <View style={[styles.dot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.pathText, { color: colors.text }]}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.routeStats}>
        <View style={styles.stat}>
          <Ionicons name="navigate-outline" size={16} color={colors.textMuted} />
          <Text style={[styles.statText, { color: colors.textMuted }]}>{item.distance}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={colors.textMuted} />
          <Text style={[styles.statText, { color: colors.textMuted }]}>{item.duration}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="star" size={16} color={colors.accent} />
          <Text style={[styles.statText, { color: colors.textMuted }]}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.routeFooter}>
        <Text style={[styles.fare, { color: colors.primary }]}>{item.fare}</Text>
        <TouchableOpacity style={[styles.bookBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.getParent()?.navigate('Home', { screen: 'Booking' })}>
          <Text style={styles.bookBtnText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search routes..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === 'all' && { backgroundColor: colors.primary },
            filter !== 'all' && { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, { color: filter === 'all' ? '#fff' : colors.text }]}>
            All Routes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === 'popular' && { backgroundColor: colors.primary },
            filter !== 'popular' && { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
          ]}
          onPress={() => setFilter('popular')}
        >
          <Text style={[styles.filterText, { color: filter === 'popular' ? '#fff' : colors.text }]}>
            Popular
          </Text>
        </TouchableOpacity>
      </View>

      {/* Routes List */}
      <FlatList
        data={filteredRoutes}
        renderItem={renderRoute}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="map-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No routes found</Text>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 12,
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
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  routeCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  popularBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '600',
  },
  routePath: {
    marginBottom: 12,
  },
  pathPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pathText: {
    fontSize: 14,
  },
  pathLine: {
    width: 1,
    height: 16,
    marginLeft: 4,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
  },
  routeStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
  },
  routeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fare: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
