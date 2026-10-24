import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useTheme } from '../context/ThemeContext';

const nearbyMatatus = [
  { id: 1, sacco: 'Super Metro', vehicle: 'KCB 123A', eta: 3, fare: 100, seats: 5, rating: 4.8 },
  { id: 2, sacco: '2NK Sacco', vehicle: 'KDA 456B', eta: 5, fare: 100, seats: 8, rating: 4.5 },
  { id: 3, sacco: 'Kenya Mpya', vehicle: 'KDB 789C', eta: 8, fare: 90, seats: 3, rating: 4.6 },
  { id: 4, sacco: 'Embassava', vehicle: 'KCE 234D', eta: 4, fare: 80, seats: 10, rating: 4.7 },
  { id: 5, sacco: 'Umoinner', vehicle: 'KDF 567E', eta: 6, fare: 70, seats: 6, rating: 4.4 },
  { id: 6, sacco: 'Githurai 45', vehicle: 'KBZ 890F', eta: 9, fare: 60, seats: 4, rating: 4.3 },
  { id: 7, sacco: 'Forward Travelers', vehicle: 'KCG 111G', eta: 7, fare: 100, seats: 7, rating: 4.6 },
  { id: 8, sacco: 'KBS', vehicle: 'KDH 222H', eta: 10, fare: 50, seats: 12, rating: 4.2 },
  { id: 9, sacco: 'Mwamba', vehicle: 'KCI 333I', eta: 11, fare: 80, seats: 5, rating: 4.5 },
  { id: 10, sacco: 'Thika Road Shuttle', vehicle: 'KDJ 444J', eta: 2, fare: 120, seats: 14, rating: 4.9 },
  { id: 11, sacco: 'Metro Trans', vehicle: 'KCK 555K', eta: 4, fare: 90, seats: 6, rating: 4.7 },
  { id: 12, sacco: 'Citi Hoppa', vehicle: 'KDL 666L', eta: 5, fare: 80, seats: 9, rating: 4.4 },
  { id: 13, sacco: 'Double M', vehicle: 'KCM 777M', eta: 6, fare: 70, seats: 7, rating: 4.3 },
  { id: 14, sacco: 'Kiambu Road', vehicle: 'KDN 888N', eta: 8, fare: 60, seats: 5, rating: 4.5 },
  { id: 15, sacco: 'Ngong Line', vehicle: 'KCP 999P', eta: 7, fare: 80, seats: 8, rating: 4.6 },
  { id: 16, sacco: 'Karen Connection', vehicle: 'KDQ 101Q', eta: 9, fare: 70, seats: 6, rating: 4.4 },
  { id: 17, sacco: 'Rongai Express', vehicle: 'KCR 202R', eta: 10, fare: 100, seats: 10, rating: 4.5 },
  { id: 18, sacco: 'Kikuyu Travelers', vehicle: 'KDS 303S', eta: 12, fare: 80, seats: 4, rating: 4.2 },
  { id: 19, sacco: 'Kasarani Shuttle', vehicle: 'KCT 404T', eta: 5, fare: 60, seats: 7, rating: 4.6 },
  { id: 20, sacco: 'Umoja Route', vehicle: 'KDU 505U', eta: 6, fare: 50, seats: 8, rating: 4.3 },
  { id: 21, sacco: 'Buruburu Sacco', vehicle: 'KCV 606V', eta: 7, fare: 50, seats: 6, rating: 4.4 },
  { id: 22, sacco: 'Eastlands Shuttle', vehicle: 'KDW 707W', eta: 8, fare: 40, seats: 5, rating: 4.1 },
  { id: 23, sacco: 'Kayole Express', vehicle: 'KCX 808X', eta: 9, fare: 50, seats: 9, rating: 4.2 },
  { id: 24, sacco: 'Pipeline Sacco', vehicle: 'KDY 909Y', eta: 10, fare: 60, seats: 7, rating: 4.3 },
  { id: 25, sacco: 'South B Shuttle', vehicle: 'KCZ 010Z', eta: 4, fare: 40, seats: 6, rating: 4.5 },
  { id: 26, sacco: 'Langata Line', vehicle: 'KDA 121A', eta: 6, fare: 50, seats: 8, rating: 4.4 },
  { id: 27, sacco: 'Lavington Sacco', vehicle: 'KDB 232B', eta: 5, fare: 60, seats: 5, rating: 4.6 },
  { id: 28, sacco: 'Kilimani Express', vehicle: 'KDC 343C', eta: 4, fare: 50, seats: 7, rating: 4.7 },
  { id: 29, sacco: 'Parklands Shuttle', vehicle: 'KDD 454D', eta: 3, fare: 40, seats: 6, rating: 4.5 },
  { id: 30, sacco: 'Highridge Sacco', vehicle: 'KDE 565E', eta: 5, fare: 50, seats: 8, rating: 4.4 },
  { id: 31, sacco: 'Ruaka Express', vehicle: 'KDF 676F', eta: 8, fare: 70, seats: 6, rating: 4.3 },
  { id: 32, sacco: 'Banana Hill', vehicle: 'KDG 787G', eta: 10, fare: 80, seats: 5, rating: 4.2 },
  { id: 33, sacco: 'Limuru Road', vehicle: 'KDH 898H', eta: 12, fare: 100, seats: 7, rating: 4.4 },
  { id: 34, sacco: 'Ndenderu Sacco', vehicle: 'KDI 909I', eta: 11, fare: 90, seats: 6, rating: 4.3 },
  { id: 35, sacco: 'Githunguri Line', vehicle: 'KDJ 020J', eta: 15, fare: 120, seats: 8, rating: 4.1 },
];

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: 'phone-portrait', desc: 'Pay with M-Pesa' },
  { id: 'wallet', name: 'Wallet', icon: 'wallet', desc: 'KSh 500 balance' },
  { id: 'card', name: 'Card', icon: 'card', desc: 'Visa •••• 4242' },
];

export default function BookingScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedMatatu, setSelectedMatatu] = useState<typeof nearbyMatatus[0] | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions to use this feature');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Reverse geocode to get address
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const locationName = [address.street, address.district, address.city]
          .filter(Boolean)
          .join(', ');
        setPickup(locationName || 'Current Location');
      } else {
        setPickup('Current Location');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleShareTrip = async () => {
    if (!selectedMatatu) return;
    try {
      await Share.share({
        message: `I'm taking a matatu from ${pickup} to ${destination}.\n\nVehicle: ${selectedMatatu.vehicle} (${selectedMatatu.sacco})\nETA: ${selectedMatatu.eta} minutes\n\nTracking via Ma3 App`,
        title: 'Share My Trip',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleSearch = () => {
    if (pickup && destination) {
      setStep(2);
    }
  };

  const handleSelectMatatu = (matatu: typeof nearbyMatatus[0]) => {
    setSelectedMatatu(matatu);
    setStep(3);
  };

  const handleConfirm = () => {
    setStep(4);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Step 1: Location */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>Where are you going?</Text>

            <View style={[styles.locationCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <TextInput
                  style={[styles.locationInput, { color: colors.text }]}
                  placeholder="Pickup location"
                  placeholderTextColor={colors.textMuted}
                  value={pickup}
                  onChangeText={setPickup}
                />
                <TouchableOpacity 
                  style={[styles.gpsBtn, { backgroundColor: colors.primary + '20' }]}
                  onPress={getCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <Ionicons name="locate" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: colors.accent }]} />
                <TextInput
                  style={[styles.locationInput, { color: colors.text }]}
                  placeholder="Where to?"
                  placeholderTextColor={colors.textMuted}
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
            </View>

            {/* Use Current Location Button */}
            <TouchableOpacity
              style={[styles.useLocationBtn, { backgroundColor: colors.primary + '15' }]}
              onPress={getCurrentLocation}
              disabled={isLoadingLocation}
            >
              <Ionicons name="navigate" size={18} color={colors.primary} />
              <Text style={[styles.useLocationText, { color: colors.primary }]}>
                {isLoadingLocation ? 'Getting location...' : 'Use my current location'}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.label, { color: colors.textMuted }]}>Popular destinations</Text>
            <View style={styles.quickPicks}>
              {['Nairobi CBD', 'Westlands', 'Thika Town'].map((place) => (
                <TouchableOpacity
                  key={place}
                  style={[styles.quickPick, { backgroundColor: colors.surface }]}
                  onPress={() => setDestination(place)}
                >
                  <Text style={[styles.quickPickText, { color: colors.text }]}>{place}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: colors.primary, opacity: pickup && destination ? 1 : 0.5 }]}
              onPress={handleSearch}
              disabled={!pickup || !destination}
            >
              <Text style={styles.primaryBtnText}>Find Matatus</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Select Matatu */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
              <Text style={[styles.backText, { color: colors.text }]}>Change location</Text>
            </TouchableOpacity>

            <View style={styles.tripSummary}>
              <Ionicons name="location" size={18} color={colors.primary} />
              <Text style={[styles.tripText, { color: colors.text }]}>{pickup}</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.textMuted} />
              <Text style={[styles.tripText, { color: colors.text }]}>{destination}</Text>
            </View>

            <Text style={[styles.stepTitle, { color: colors.text }]}>Available Matatus</Text>

            {nearbyMatatus.map((matatu) => (
              <TouchableOpacity
                key={matatu.id}
                style={[styles.matatuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => handleSelectMatatu(matatu)}
              >
                <View style={[styles.matatuIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="bus" size={24} color={colors.primary} />
                </View>
                <View style={styles.matatuInfo}>
                  <Text style={[styles.matatuName, { color: colors.text }]}>{matatu.sacco}</Text>
                  <Text style={[styles.matatuMeta, { color: colors.textMuted }]}>
                    {matatu.vehicle} • {matatu.seats} seats
                  </Text>
                  <View style={styles.matatuStats}>
                    <View style={styles.statItem}>
                      <Ionicons name="time" size={14} color={colors.accent} />
                      <Text style={[styles.statText, { color: colors.textMuted }]}>{matatu.eta} min</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons name="star" size={14} color={colors.accent} />
                      <Text style={[styles.statText, { color: colors.textMuted }]}>{matatu.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.fareContainer}>
                  <Text style={[styles.fare, { color: colors.primary }]}>KSh {matatu.fare}</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3: Payment */}
        {step === 3 && selectedMatatu && (
          <View style={styles.stepContainer}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
              <Text style={[styles.backText, { color: colors.text }]}>Choose different matatu</Text>
            </TouchableOpacity>

            <Text style={[styles.stepTitle, { color: colors.text }]}>Confirm & Pay</Text>

            <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.summaryRow}>
                <View style={[styles.matatuIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="bus" size={24} color={colors.primary} />
                </View>
                <View style={styles.summaryInfo}>
                  <Text style={[styles.matatuName, { color: colors.text }]}>{selectedMatatu.sacco}</Text>
                  <Text style={[styles.matatuMeta, { color: colors.textMuted }]}>{selectedMatatu.vehicle}</Text>
                </View>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.summaryDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textMuted }]}>From</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{pickup}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textMuted }]}>To</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{destination}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textMuted }]}>ETA</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedMatatu.eta} min</Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.detailRow}>
                  <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
                  <Text style={[styles.totalValue, { color: colors.primary }]}>KSh {selectedMatatu.fare}</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.label, { color: colors.text }]}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  { backgroundColor: colors.surface, borderColor: selectedPayment === method.id ? colors.primary : colors.border },
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={[styles.paymentIcon, { backgroundColor: selectedPayment === method.id ? colors.primary : colors.border }]}>
                  <Ionicons name={method.icon as any} size={20} color={selectedPayment === method.id ? '#fff' : colors.text} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={[styles.paymentName, { color: colors.text }]}>{method.name}</Text>
                  <Text style={[styles.paymentDesc, { color: colors.textMuted }]}>{method.desc}</Text>
                </View>
                {selectedPayment === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: colors.accent }]}
              onPress={handleConfirm}
            >
              <Text style={[styles.primaryBtnText, { color: colors.primaryDark }]}>
                Pay KSh {selectedMatatu.fare} & Book
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Confirmed */}
        {step === 4 && selectedMatatu && (
          <View style={styles.stepContainer}>
            <View style={styles.successContainer}>
              <View style={[styles.successIcon, { backgroundColor: '#22C55E20' }]}>
                <Ionicons name="checkmark-circle" size={60} color="#22C55E" />
              </View>
              <Text style={[styles.successTitle, { color: colors.text }]}>Booking Confirmed!</Text>
              <Text style={[styles.successSubtitle, { color: colors.textMuted }]}>
                Your matatu is on the way
              </Text>

              <View style={[styles.etaCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={[styles.matatuIcon, { backgroundColor: colors.primary + '20', width: 60, height: 60 }]}>
                  <Ionicons name="bus" size={32} color={colors.primary} />
                </View>
                <Text style={[styles.etaTime, { color: colors.accent }]}>{selectedMatatu.eta} min</Text>
                <Text style={[styles.etaLabel, { color: colors.textMuted }]}>Estimated arrival</Text>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.vehicleInfo}>
                  <Text style={[styles.vehicleLabel, { color: colors.textMuted }]}>Vehicle</Text>
                  <Text style={[styles.vehicleValue, { color: colors.text }]}>{selectedMatatu.vehicle}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Tracking')}>
                  <Ionicons name="navigate" size={20} color="#fff" />
                  <Text style={styles.actionBtnText}>Track Matatu</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
                  onPress={handleShareTrip}
                >
                  <Ionicons name="share-social" size={20} color={colors.text} />
                  <Text style={[styles.actionBtnText, { color: colors.text }]}>Share Trip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  gpsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  useLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  useLocationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  quickPicks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  quickPick: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quickPickText: {
    fontSize: 14,
  },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
  },
  tripSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tripText: {
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
  matatuName: {
    fontSize: 16,
    fontWeight: '600',
  },
  matatuMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  matatuStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  fareContainer: {
    alignItems: 'flex-end',
  },
  fare: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryInfo: {
    marginLeft: 12,
  },
  summaryDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  etaCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    width: '100%',
    marginBottom: 24,
  },
  etaTime: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
  },
  etaLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  vehicleLabel: {
    fontSize: 14,
  },
  vehicleValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 30,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
