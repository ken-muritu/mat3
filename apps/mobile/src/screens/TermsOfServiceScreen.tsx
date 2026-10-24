import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By downloading, installing, or using the Ma3 mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.`,
  },
  {
    title: '2. Description of Service',
    content: `Ma3 provides a platform that connects passengers with matatu (public transport) operators. We facilitate booking, payment, and tracking of matatu rides. Ma3 is not a transportation provider and does not own or operate any matatus.`,
  },
  {
    title: '3. User Accounts',
    content: `To use certain features of the App, you must create an account. You agree to:
• Provide accurate and complete information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

You must be at least 18 years old to create an account.`,
  },
  {
    title: '4. Booking and Payments',
    content: `When you book a ride through Ma3:
• You agree to pay the displayed fare plus any applicable fees
• Fares may vary based on route, time, and demand
• Payment is processed via M-Pesa, card, or Ma3 Wallet
• Refunds are subject to our refund policy
• Cancelled bookings may incur cancellation fees`,
  },
  {
    title: '5. User Conduct',
    content: `You agree NOT to:
• Use the App for any illegal purpose
• Harass, threaten, or harm other users or operators
• Provide false information or impersonate others
• Interfere with the App's operation or security
• Use the App while intoxicated or under the influence
• Damage or vandalize any matatu vehicle`,
  },
  {
    title: '6. Safety',
    content: `Your safety is important to us. While we implement safety features including SOS alerts and trip sharing, you acknowledge that:
• Ma3 cannot guarantee your personal safety
• You are responsible for your own safety decisions
• You should follow all safety guidelines provided
• Emergency services should be contacted directly in emergencies`,
  },
  {
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by law, Ma3 shall not be liable for:
• Actions or omissions of matatu operators or drivers
• Delays, cancellations, or route changes
• Loss or damage to personal property
• Injuries occurring during or after rides
• Technical failures or service interruptions

Our liability is limited to the amount you paid for the specific service in question.`,
  },
  {
    title: '8. Intellectual Property',
    content: `The App and its content, including but not limited to text, graphics, logos, and software, are the property of Ma3 and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our permission.`,
  },
  {
    title: '9. Termination',
    content: `We may suspend or terminate your account at any time for violation of these Terms or for any other reason at our discretion. Upon termination, your right to use the App ceases immediately.`,
  },
  {
    title: '10. Changes to Terms',
    content: `We may modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms. We will notify users of material changes via the App or email.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Kenya.`,
  },
  {
    title: '12. Contact',
    content: `For questions about these Terms, contact us at:
Email: legal@ma3.co.ke
Address: Nairobi, Kenya

Last updated: January 2025`,
  },
];

export default function TermsOfServiceScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.header, { color: colors.text }]}>Terms of Service</Text>
        <Text style={[styles.intro, { color: colors.textMuted }]}>
          Please read these Terms of Service carefully before using the Ma3 mobile application.
        </Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={[styles.sectionContent, { color: colors.textMuted }]}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
