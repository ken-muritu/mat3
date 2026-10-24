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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function PrivacySecurityScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [settings, setSettings] = useState({
    locationTracking: true,
    shareRideHistory: false,
    biometricLogin: false,
    twoFactorAuth: false,
    marketingEmails: true,
    dataCollection: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'A password reset link will be sent to your email.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Link', onPress: () => Alert.alert('Success', 'Password reset link sent!') },
      ]
    );
  };

  const handleDownloadData = () => {
    Alert.alert(
      'Download Your Data',
      'We will prepare a copy of your data and email it to you within 48 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request Data', onPress: () => Alert.alert('Success', 'Data request submitted!') },
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your data including trip history, payment methods, and account information. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Everything', 
          style: 'destructive',
          onPress: () => Alert.alert('Scheduled', 'Your data will be deleted within 30 days.')
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SECURITY</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.row} onPress={handleChangePassword}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="key" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Change Password</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Update your account password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="finger-print" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Biometric Login</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Use fingerprint or face to sign in</Text>
              </View>
              <Switch
                value={settings.biometricLogin}
                onValueChange={() => handleToggle('biometricLogin')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Two-Factor Authentication</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Add extra security to your account</Text>
              </View>
              <Switch
                value={settings.twoFactorAuth}
                onValueChange={() => handleToggle('twoFactorAuth')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>PRIVACY</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="location" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Location Tracking</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Allow tracking during trips</Text>
              </View>
              <Switch
                value={settings.locationTracking}
                onValueChange={() => handleToggle('locationTracking')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="share-social" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Share Ride History</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Allow sharing anonymized data</Text>
              </View>
              <Switch
                value={settings.shareRideHistory}
                onValueChange={() => handleToggle('shareRideHistory')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="analytics" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Usage Analytics</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Help improve the app</Text>
              </View>
              <Switch
                value={settings.dataCollection}
                onValueChange={() => handleToggle('dataCollection')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="mail" size={20} color={colors.primary} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Marketing Emails</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Receive offers and updates</Text>
              </View>
              <Switch
                value={settings.marketingEmails}
                onValueChange={() => handleToggle('marketingEmails')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>DATA MANAGEMENT</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.row} onPress={handleDownloadData}>
              <View style={[styles.iconContainer, { backgroundColor: colors.success + '15' }]}>
                <Ionicons name="download" size={20} color={colors.success} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Download My Data</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Get a copy of your information</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.row} onPress={handleDeleteData}>
              <View style={[styles.iconContainer, { backgroundColor: colors.danger + '15' }]}>
                <Ionicons name="trash" size={20} color={colors.danger} />
              </View>
              <View style={styles.rowInfo}>
                <Text style={[styles.rowTitle, { color: colors.danger }]}>Delete All My Data</Text>
                <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>Permanently remove all data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Links */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.linkBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Ionicons name="document-text" size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.linkBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            <Ionicons name="document" size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  row: {
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
  rowInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 68,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
