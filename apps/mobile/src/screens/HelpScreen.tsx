import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const faqs = [
  {
    id: '1',
    question: 'How do I book a matatu?',
    answer: 'Tap "Book a Ride" on the home screen, enter your pickup and destination, select a matatu from the available options, choose your payment method, and confirm your booking.',
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept M-Pesa, debit/credit cards, and Ma3 Wallet. You can add or manage payment methods in your profile settings.',
  },
  {
    id: '3',
    question: 'How do I track my matatu?',
    answer: 'After booking, tap "Track Matatu" to see the real-time location of your vehicle on the map along with the estimated time of arrival.',
  },
  {
    id: '4',
    question: 'How do I cancel a booking?',
    answer: 'You can cancel a booking from the tracking screen before the matatu arrives. Cancellation fees may apply depending on timing.',
  },
  {
    id: '5',
    question: 'What should I do in an emergency?',
    answer: 'Use the SOS button in the Safety section to immediately alert your emergency contacts and our safety team. You can also call 999 for police or 114 for ambulance.',
  },
  {
    id: '6',
    question: 'How do I add emergency contacts?',
    answer: 'Go to Profile > Emergency Contacts and tap "Add Contact" to add trusted contacts who will be notified during emergencies.',
  },
  {
    id: '7',
    question: 'How do I get a refund?',
    answer: 'Contact our support team through this app or email support@ma3.co.ke with your booking details. Refunds are processed within 3-5 business days.',
  },
  {
    id: '8',
    question: 'Is my data safe?',
    answer: 'Yes, we use industry-standard encryption to protect your personal data. Read our Privacy Policy for more details on how we handle your information.',
  },
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContact = (method: string) => {
    switch (method) {
      case 'email':
        Linking.openURL('mailto:support@ma3.co.ke');
        break;
      case 'phone':
        Linking.openURL('tel:+254700000000');
        break;
      case 'whatsapp':
        Linking.openURL('https://wa.me/254700000000');
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search help topics..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('email')}
            >
              <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="mail" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('phone')}
            >
              <View style={[styles.contactIcon, { backgroundColor: colors.success + '20' }]}>
                <Ionicons name="call" size={24} color={colors.success} />
              </View>
              <Text style={[styles.contactLabel, { color: colors.text }]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact('whatsapp')}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#25D366' + '20' }]}>
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
              </View>
              <Text style={[styles.contactLabel, { color: colors.text }]}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
          {filteredFaqs.map(faq => (
            <TouchableOpacity
              key={faq.id}
              style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
                <Ionicons
                  name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textMuted}
                />
              </View>
              {expandedId === faq.id && (
                <Text style={[styles.faqAnswer, { color: colors.textMuted }]}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  contactCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  faqCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
});
