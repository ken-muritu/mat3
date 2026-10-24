import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const mockContacts: EmergencyContact[] = [
  { id: '1', name: 'Jane Wanjiku', phone: '+254 712 345 678', relationship: 'Spouse' },
  { id: '2', name: 'Peter Kamau', phone: '+254 723 456 789', relationship: 'Brother' },
];

const safetyTips = [
  { icon: 'eye', title: 'Stay Alert', desc: 'Be aware of your surroundings at all times' },
  { icon: 'share-social', title: 'Share Your Trip', desc: 'Let someone know your travel plans' },
  { icon: 'call', title: 'Emergency Numbers', desc: 'Police: 999 | Ambulance: 114' },
  { icon: 'location', title: 'Track Location', desc: 'Keep location services enabled during trips' },
];

export default function SafetyScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockContacts);
  const [autoShare, setAutoShare] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  const handleAddContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      Alert.alert('Error', 'Please enter name and phone number');
      return;
    }
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newContact.name.trim(),
      phone: newContact.phone.trim(),
      relationship: newContact.relationship.trim() || 'Contact',
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '' });
    setShowAddModal(false);
    Alert.alert('Success', 'Emergency contact added');
  };

  const handleSOS = () => {
    Alert.alert(
      '🚨 Emergency SOS',
      'This will immediately:\n\n• Alert all emergency contacts\n• Share your live location\n• Notify Ma3 safety team\n• Contact local authorities if needed\n\nContinue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'SEND SOS', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'SOS Activated',
              'Emergency contacts have been notified with your location. Help is on the way.',
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const handleRemoveContact = (id: string) => {
    Alert.alert(
      'Remove Contact',
      'Are you sure you want to remove this emergency contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => setContacts(contacts.filter(c => c.id !== id))
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SOS Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity 
            style={[styles.sosButton, { backgroundColor: colors.danger }]}
            onPress={handleSOS}
            activeOpacity={0.8}
          >
            <Ionicons name="warning" size={48} color="#fff" />
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.sosSubtext}>Tap in emergency</Text>
          </TouchableOpacity>
          <Text style={[styles.sosHint, { color: colors.textMuted }]}>
            Press and hold for 3 seconds to activate silent SOS
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Emergency Contacts
            </Text>
            <TouchableOpacity onPress={openAddModal}>
              <Ionicons name="add-circle" size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {contacts.map((contact) => (
            <View
              key={contact.id}
              style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.contactAvatar, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.avatarText, { color: colors.primary }]}>
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactName, { color: colors.text }]}>{contact.name}</Text>
                <Text style={[styles.contactPhone, { color: colors.textMuted }]}>{contact.phone}</Text>
                <Text style={[styles.contactRelation, { color: colors.accent }]}>{contact.relationship}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveContact(contact.id)}>
                <Ionicons name="close-circle" size={24} color={colors.danger} />
              </TouchableOpacity>
            </View>
          ))}

          {contacts.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
              <Ionicons name="people-outline" size={40} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                No emergency contacts added
              </Text>
              <TouchableOpacity 
                style={[styles.addBtn, { backgroundColor: colors.primary }]}
                onPress={openAddModal}
              >
                <Text style={styles.addBtnText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Add Contact Modal */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Add Emergency Contact</Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalForm}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Name</Text>
                <TextInput
                  style={[styles.modalInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
                  placeholder="Contact name"
                  placeholderTextColor={colors.textMuted}
                  value={newContact.name}
                  onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                />

                <Text style={[styles.inputLabel, { color: colors.text }]}>Phone Number</Text>
                <TextInput
                  style={[styles.modalInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
                  placeholder="+254 7XX XXX XXX"
                  placeholderTextColor={colors.textMuted}
                  value={newContact.phone}
                  onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                  keyboardType="phone-pad"
                />

                <Text style={[styles.inputLabel, { color: colors.text }]}>Relationship</Text>
                <TextInput
                  style={[styles.modalInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
                  placeholder="e.g., Spouse, Parent, Friend"
                  placeholderTextColor={colors.textMuted}
                  value={newContact.relationship}
                  onChangeText={(text) => setNewContact({ ...newContact, relationship: text })}
                />
              </View>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                onPress={handleAddContact}
              >
                <Text style={styles.modalBtnText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Auto Share Setting */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.settingRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setAutoShare(!autoShare)}
          >
            <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="share-social" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Auto-Share Trips</Text>
              <Text style={[styles.settingDesc, { color: colors.textMuted }]}>
                Automatically share trip details with emergency contacts
              </Text>
            </View>
            <View style={[styles.toggle, { backgroundColor: autoShare ? colors.primary : colors.border }]}>
              <View style={[styles.toggleKnob, { transform: [{ translateX: autoShare ? 20 : 0 }] }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Safety Tips</Text>
          <View style={styles.tipsGrid}>
            {safetyTips.map((tip, index) => (
              <View
                key={index}
                style={[styles.tipCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={[styles.tipIcon, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name={tip.icon as any} size={24} color={colors.success} />
                </View>
                <Text style={[styles.tipTitle, { color: colors.text }]}>{tip.title}</Text>
                <Text style={[styles.tipDesc, { color: colors.textMuted }]}>{tip.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Report Issue */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.reportBtn, { backgroundColor: colors.warning + '20', borderColor: colors.warning }]}
            onPress={() => navigation.navigate('ReportSafety')}
          >
            <Ionicons name="flag" size={24} color={colors.warning} />
            <View style={styles.reportInfo}>
              <Text style={[styles.reportTitle, { color: colors.text }]}>Report a Safety Issue</Text>
              <Text style={[styles.reportDesc, { color: colors.textMuted }]}>
                Report harassment, unsafe driving, or other concerns
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Insurance Info */}
        <View style={[styles.insuranceCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="shield-checkmark" size={32} color="#fff" />
          <View style={styles.insuranceInfo}>
            <Text style={styles.insuranceTitle}>You're Protected</Text>
            <Text style={styles.insuranceDesc}>
              Every trip includes up to KSh 5M passenger insurance coverage
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
  sosSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  sosButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  sosText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sosSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  sosHint: {
    marginTop: 16,
    fontSize: 13,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    marginTop: 2,
  },
  contactRelation: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 16,
  },
  addBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 3,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 12,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  reportDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  insuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  insuranceDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalForm: {
    gap: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  modalInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  modalBtn: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
