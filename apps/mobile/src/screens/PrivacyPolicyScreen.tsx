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
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, book a ride, or contact us for support.

This includes:
• Personal information (name, email, phone number)
• Location data (pickup and drop-off locations)
• Payment information (processed securely via M-Pesa/card providers)
• Device information (device type, operating system)
• Usage data (app interactions, ride history)`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
• Process and manage your ride bookings
• Provide real-time tracking and notifications
• Process payments securely
• Send you important updates about your trips
• Improve our services and user experience
• Ensure safety and prevent fraud
• Comply with legal obligations`,
  },
  {
    title: '3. Information Sharing',
    content: `We may share your information with:
• Matatu operators (necessary trip details only)
• Payment processors (M-Pesa, card providers)
• Emergency services (when SOS is activated)
• Your designated emergency contacts (when you share trips)
• Law enforcement (when legally required)

We do NOT sell your personal information to third parties.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures to protect your data:
• Encryption of data in transit and at rest
• Secure authentication systems
• Regular security audits
• Access controls and monitoring

While we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: '5. Your Rights',
    content: `You have the right to:
• Access your personal data
• Correct inaccurate information
• Delete your account and data
• Opt-out of marketing communications
• Export your data

To exercise these rights, contact us at privacy@ma3.co.ke`,
  },
  {
    title: '6. Location Data',
    content: `We collect location data to:
• Show nearby matatus and routes
• Track your trip in real-time
• Calculate fares accurately
• Enable emergency SOS features

You can control location permissions in your device settings. Note that disabling location may limit app functionality.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your data for as long as your account is active or as needed to provide services. Trip history is retained for up to 2 years for dispute resolution and legal compliance.

You may request deletion of your account at any time.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `Ma3 is not intended for users under 18 years of age. We do not knowingly collect information from children under 18.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes via the app or email.

Last updated: January 2025`,
  },
  {
    title: '10. Contact Us',
    content: `If you have questions about this Privacy Policy, contact us at:

Email: privacy@ma3.co.ke
Address: Nairobi, Kenya`,
  },
];

export default function PrivacyPolicyScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.header, { color: colors.text }]}>Privacy Policy</Text>
        <Text style={[styles.intro, { color: colors.textMuted }]}>
          Ma3 ("we", "our", or "us") is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and safeguard your information 
          when you use our mobile application.
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
