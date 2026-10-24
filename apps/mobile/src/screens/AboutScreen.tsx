import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { colors } = useTheme();

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Ionicons name="bus" size={48} color="#fff" />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>Ma3</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>Panda. Lipa. Fika.</Text>
          <Text style={[styles.version, { color: colors.textMuted }]}>Version 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.description, { color: colors.text }]}>
            Ma3 is Kenya's smart matatu booking app that makes public transport easier, 
            safer, and more convenient. Book rides, track your matatu in real-time, 
            pay digitally, and travel with peace of mind.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {[
              { icon: 'search', text: 'Find matatus on any route' },
              { icon: 'navigate', text: 'Real-time GPS tracking' },
              { icon: 'card', text: 'Cashless payments via M-Pesa' },
              { icon: 'shield-checkmark', text: 'Safety features & SOS' },
              { icon: 'time', text: 'Accurate arrival estimates' },
              { icon: 'star', text: 'Rate your experience' },
            ].map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name={feature.icon as any} size={20} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.text }]}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Made in Kenya 🇰🇪</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.teamText, { color: colors.textMuted }]}>
              Ma3 is built by a passionate team of Kenyan developers committed to 
              improving public transportation in our cities. We believe everyone 
              deserves a safe, reliable, and affordable commute.
            </Text>
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Follow Us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity 
              style={[styles.socialBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleLink('https://twitter.com/ma3app')}
            >
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleLink('https://facebook.com/ma3app')}
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleLink('https://instagram.com/ma3app')}
            >
              <Ionicons name="logo-instagram" size={24} color="#E4405F" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleLink('https://ma3.co.ke')}
            >
              <Ionicons name="globe" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <Text style={[styles.copyright, { color: colors.textMuted }]}>
          © 2024 Ma3. All rights reserved.
        </Text>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    marginTop: 4,
  },
  version: {
    fontSize: 14,
    marginTop: 8,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 15,
  },
  teamText: {
    fontSize: 14,
    lineHeight: 20,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 32,
    marginBottom: 20,
  },
});
