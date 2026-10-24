import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useTheme } from '../context/ThemeContext';
import { getStaticMapUrl } from '../services/mapService';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapPickerProps {
  initialLocation?: Coordinates;
  onLocationSelect: (location: Coordinates, address: string) => void;
  onClose: () => void;
  title?: string;
}

interface LocationSuggestion {
  id: string;
  name: string;
  address: string;
  coords: Coordinates;
}

const NAIROBI_CENTER: Coordinates = {
  latitude: -1.2864,
  longitude: 36.8172,
};

const POPULAR_LOCATIONS: LocationSuggestion[] = [
  { id: '1', name: 'Nairobi CBD', address: 'Central Business District', coords: { latitude: -1.2864, longitude: 36.8172 } },
  { id: '2', name: 'Westlands', address: 'Westlands, Nairobi', coords: { latitude: -1.2673, longitude: 36.8110 } },
  { id: '3', name: 'Thika Town', address: 'Thika, Kiambu', coords: { latitude: -1.0333, longitude: 37.0693 } },
  { id: '4', name: 'Juja', address: 'Juja, Kiambu', coords: { latitude: -1.1000, longitude: 37.0167 } },
  { id: '5', name: 'Ruiru', address: 'Ruiru, Kiambu', coords: { latitude: -1.1500, longitude: 36.9667 } },
  { id: '6', name: 'Kasarani', address: 'Kasarani, Nairobi', coords: { latitude: -1.2333, longitude: 36.8667 } },
  { id: '7', name: 'Eastleigh', address: 'Eastleigh, Nairobi', coords: { latitude: -1.2750, longitude: 36.8500 } },
  { id: '8', name: 'Karen', address: 'Karen, Nairobi', coords: { latitude: -1.3167, longitude: 36.7000 } },
  { id: '9', name: 'Ngong', address: 'Ngong, Kajiado', coords: { latitude: -1.3500, longitude: 36.6500 } },
  { id: '10', name: 'Rongai', address: 'Rongai, Kajiado', coords: { latitude: -1.3958, longitude: 36.7444 } },
];

export default function MapPicker({ 
  initialLocation, 
  onLocationSelect, 
  onClose,
  title = 'Select Location' 
}: MapPickerProps) {
  const { colors } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<Coordinates>(
    initialLocation || NAIROBI_CENTER
  );
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSuggestion[]>([]);

  useEffect(() => {
    if (selectedLocation) {
      reverseGeocode(selectedLocation);
    }
  }, [selectedLocation]);

  const reverseGeocode = async (coords: Coordinates) => {
    try {
      setIsLoading(true);
      const results = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (results.length > 0) {
        const place = results[0];
        const parts = [
          place.name,
          place.street,
          place.district,
          place.city,
        ].filter(Boolean);
        setAddress(parts.join(', ') || 'Selected Location');
      }
    } catch (error) {
      console.error('Reverse geocode error:', error);
      setAddress('Selected Location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(newCoords);
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const results = await Location.geocodeAsync(searchQuery + ', Kenya');

      if (results.length > 0) {
        const suggestions: LocationSuggestion[] = results.slice(0, 5).map((r, i) => ({
          id: `search-${i}`,
          name: searchQuery,
          address: 'Kenya',
          coords: { latitude: r.latitude, longitude: r.longitude },
        }));
        setSearchResults(suggestions);
      } else {
        setSearchResults([]);
        Alert.alert('Not Found', 'Location not found. Try a different search.');
      }
    } catch (error) {
      console.error('Geocode error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (suggestion: LocationSuggestion) => {
    setSelectedLocation(suggestion.coords);
    setAddress(suggestion.name + ', ' + suggestion.address);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleConfirm = () => {
    onLocationSelect(selectedLocation, address);
  };

  const filteredLocations = searchQuery.length > 0
    ? POPULAR_LOCATIONS.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_LOCATIONS;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search location..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Current Location Button */}
      <TouchableOpacity
        style={[styles.currentLocationBtn, { backgroundColor: colors.primary }]}
        onPress={handleCurrentLocation}
        disabled={isLoading}
      >
        <Ionicons name="locate" size={20} color="#fff" />
        <Text style={styles.currentLocationText}>Use Current Location</Text>
        {isLoading && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 8 }} />}
      </TouchableOpacity>

      {/* Location List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {searchQuery.length > 0 ? 'SEARCH RESULTS' : 'POPULAR LOCATIONS'}
        </Text>

        {searchResults.length > 0 ? (
          searchResults.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[styles.locationItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSelectLocation(location)}
            >
              <View style={[styles.locationIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="location" size={20} color={colors.primary} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={[styles.locationName, { color: colors.text }]}>{location.name}</Text>
                <Text style={[styles.locationAddress, { color: colors.textMuted }]}>{location.address}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))
        ) : (
          filteredLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[styles.locationItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleSelectLocation(location)}
            >
              <View style={[styles.locationIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="location" size={20} color={colors.primary} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={[styles.locationName, { color: colors.text }]}>{location.name}</Text>
                <Text style={[styles.locationAddress, { color: colors.textMuted }]}>{location.address}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Panel with Map Preview */}
      <View style={[styles.bottomPanel, { backgroundColor: colors.surface }]}>
        {/* Mini Map Preview */}
        <View style={styles.mapPreviewContainer}>
          <Image
            source={{ uri: getStaticMapUrl(selectedLocation, { width: 300, height: 120, zoom: 14, markers: [{ coords: selectedLocation, color: '#006B3F' }] }) }}
            style={styles.mapPreview}
            resizeMode="cover"
          />
          <View style={[styles.mapOverlay, { backgroundColor: colors.primary }]}>
            <Ionicons name="location" size={16} color="#fff" />
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressInfo}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                <Text style={[styles.addressText, { color: colors.text }]} numberOfLines={2}>
                  {address || 'Select a location above'}
                </Text>
                <Text style={[styles.coordsText, { color: colors.textMuted }]}>
                  {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                </Text>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmBtn, { backgroundColor: colors.primary, opacity: address ? 1 : 0.5 }]}
          onPress={handleConfirm}
          disabled={isLoading || !address}
        >
          <Text style={styles.confirmBtnText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 16,
  },
  closeBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  currentLocationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    gap: 12,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 13,
  },
  bottomPanel: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  mapPreviewContainer: {
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  mapPreview: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addressContainer: {
    marginBottom: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  coordsText: {
    fontSize: 12,
  },
  confirmBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
