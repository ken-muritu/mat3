import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const issueTypes = [
  { id: 'harassment', icon: 'person-remove', label: 'Harassment', desc: 'Verbal abuse, threats, or unwanted contact' },
  { id: 'unsafe-driving', icon: 'speedometer', label: 'Unsafe Driving', desc: 'Speeding, reckless driving, phone use' },
  { id: 'overcharging', icon: 'cash', label: 'Overcharging', desc: 'Charged more than displayed fare' },
  { id: 'vehicle-condition', icon: 'car', label: 'Vehicle Condition', desc: 'Unsafe or unsanitary vehicle' },
  { id: 'route-deviation', icon: 'navigate', label: 'Route Deviation', desc: 'Driver took a different route' },
  { id: 'other', icon: 'alert-circle', label: 'Other Issue', desc: 'Any other safety concern' },
];

export default function ReportSafetyScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select an issue type');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe what happened');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted',
        'Thank you for your report. Our safety team will review it within 24 hours. We may contact you for more information.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Report a Safety Issue</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Your safety matters to us. All reports are reviewed by our safety team.
          </Text>
        </View>

        {/* Issue Type Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What happened?</Text>
          <View style={styles.issueGrid}>
            {issueTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.issueCard,
                  { 
                    backgroundColor: colors.surface, 
                    borderColor: selectedType === type.id ? colors.primary : colors.border,
                    borderWidth: selectedType === type.id ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <View style={[
                  styles.issueIcon, 
                  { backgroundColor: selectedType === type.id ? colors.primary + '20' : colors.border }
                ]}>
                  <Ionicons 
                    name={type.icon as any} 
                    size={24} 
                    color={selectedType === type.id ? colors.primary : colors.textMuted} 
                  />
                </View>
                <Text style={[styles.issueLabel, { color: colors.text }]}>{type.label}</Text>
                <Text style={[styles.issueDesc, { color: colors.textMuted }]}>{type.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vehicle Number */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Vehicle Number (if known)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
            placeholder="e.g., KCB 123A"
            placeholderTextColor={colors.textMuted}
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            autoCapitalize="characters"
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Describe what happened</Text>
          <TextInput
            style={[
              styles.input, 
              styles.textArea,
              { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }
            ]}
            placeholder="Please provide as much detail as possible..."
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Anonymous Note */}
        <View style={[styles.noteCard, { backgroundColor: colors.primary + '10' }]}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
          <Text style={[styles.noteText, { color: colors.text }]}>
            Your report will be reviewed confidentially. Your personal information will not be shared with the operator.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitBtn, 
            { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 }
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitBtnText}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Text>
        </TouchableOpacity>

        {/* Emergency Note */}
        <View style={[styles.emergencyCard, { backgroundColor: colors.danger + '15' }]}>
          <Ionicons name="warning" size={20} color={colors.danger} />
          <View style={styles.emergencyContent}>
            <Text style={[styles.emergencyTitle, { color: colors.danger }]}>In immediate danger?</Text>
            <Text style={[styles.emergencyText, { color: colors.textMuted }]}>
              Call 999 (Police) or 114 (Ambulance) immediately
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  issueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  issueCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
  },
  issueIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  issueLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  issueDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  submitBtn: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  emergencyText: {
    fontSize: 13,
  },
});
