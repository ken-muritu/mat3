import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface SettingItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'link' | 'select';
  value?: boolean;
  options?: string[];
  currentOption?: string;
}

const settingsData: SettingItem[] = [
  { id: 'notifications', icon: 'notifications', title: 'Push Notifications', subtitle: 'Receive trip updates and offers', type: 'toggle', value: true },
  { id: 'location', icon: 'location', title: 'Location Services', subtitle: 'Required for tracking and booking', type: 'toggle', value: true },
  { id: 'autoShare', icon: 'share-social', title: 'Auto-Share Trips', subtitle: 'Share with emergency contacts', type: 'toggle', value: false },
  { id: 'language', icon: 'language', title: 'Language', subtitle: 'English', type: 'select', options: ['English', 'Swahili'] },
  { id: 'currency', icon: 'cash', title: 'Currency', subtitle: 'KES (Kenyan Shilling)', type: 'link' },
  { id: 'payment', icon: 'card', title: 'Payment Methods', subtitle: 'Manage your payment options', type: 'link' },
  { id: 'privacy', icon: 'shield', title: 'Privacy & Security', subtitle: 'Manage your data and privacy', type: 'link' },
  { id: 'help', icon: 'help-circle', title: 'Help & Support', subtitle: 'FAQs and contact support', type: 'link' },
  { id: 'about', icon: 'information-circle', title: 'About Ma3', subtitle: 'Version 1.0.0', type: 'link' },
  { id: 'terms', icon: 'document-text', title: 'Terms of Service', type: 'link' },
  { id: 'privacy-policy', icon: 'lock-closed', title: 'Privacy Policy', type: 'link' },
];

export default function SettingsScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    notifications: true,
    location: true,
    autoShare: false,
  });

  const handleToggle = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePress = (item: SettingItem) => {
    if (item.type === 'select') {
      Alert.alert(
        item.title,
        'Select an option',
        item.options?.map(opt => ({
          text: opt,
          onPress: () => console.log(`Selected ${opt}`),
        })) || []
      );
    } else if (item.type === 'link') {
      switch (item.id) {
        case 'help':
          navigation.navigate('Help');
          break;
        case 'about':
          navigation.navigate('About');
          break;
        case 'terms':
          navigation.navigate('TermsOfService');
          break;
        case 'privacy-policy':
          navigation.navigate('PrivacyPolicy');
          break;
        case 'privacy':
          navigation.navigate('PrivacySecurity');
          break;
        default:
          Alert.alert(item.title, 'This feature is coming soon!');
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => signOut() },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Theme Toggle */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>APPEARANCE</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity 
            style={styles.settingRow}
            onPress={toggleTheme}
          >
            <View style={[styles.iconContainer, { backgroundColor: isDark ? colors.accent + '20' : colors.primary + '20' }]}>
              <Ionicons 
                name={isDark ? 'moon' : 'sunny'} 
                size={20} 
                color={isDark ? colors.accent : colors.primary} 
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>
                {isDark ? 'Currently enabled' : 'Currently disabled'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>PREFERENCES</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingsData.slice(0, 3).map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.settingRow,
                index < 2 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              onPress={() => item.type === 'toggle' ? handleToggle(item.id) : handlePress(item)}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>{item.subtitle}</Text>
                )}
              </View>
              {item.type === 'toggle' && (
                <Switch
                  value={settings[item.id]}
                  onValueChange={() => handleToggle(item.id)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fff"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ACCOUNT</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingsData.slice(3, 7).map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.settingRow,
                index < 3 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              onPress={() => handlePress(item)}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>{item.subtitle}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SUPPORT</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingsData.slice(7).map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.settingRow,
                index < 3 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              onPress={() => handlePress(item)}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={[styles.settingSubtitle, { color: colors.textMuted }]}>{item.subtitle}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.dangerBtn, { backgroundColor: colors.danger + '15' }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={20} color={colors.danger} />
          <Text style={[styles.dangerBtnText, { color: colors.danger }]}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.deleteBtn, { borderColor: colors.danger }]}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.deleteBtnText, { color: colors.danger }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={[styles.version, { color: colors.textMuted }]}>
        Ma3 v1.0.0{'\n'}
        Made with ❤️ in Kenya
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  dangerBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtn: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 40,
    lineHeight: 20,
  },
});
