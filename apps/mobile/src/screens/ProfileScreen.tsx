import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'trips', icon: 'time', label: 'Trip History', badge: null },
  { id: 'favorites', icon: 'heart', label: 'Favorite Routes', badge: '3' },
  { id: 'emergency', icon: 'shield-checkmark', label: 'Emergency Contacts', badge: null },
  { id: 'payment', icon: 'card', label: 'Payment Methods', badge: null },
  { id: 'notifications', icon: 'notifications', label: 'Notifications', badge: '5' },
  { id: 'language', icon: 'language', label: 'Language', badge: 'English' },
  { id: 'help', icon: 'help-circle', label: 'Help & Support', badge: null },
  { id: 'about', icon: 'information-circle', label: 'About', badge: null },
];

export default function ProfileScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();

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

  const handleMenuPress = (id: string) => {
    switch (id) {
      case 'trips':
        navigation.navigate('History');
        break;
      case 'favorites':
        navigation.navigate('Favorites');
        break;
      case 'emergency':
        navigation.navigate('Safety');
        break;
      case 'payment':
        navigation.navigate('Settings');
        break;
      case 'notifications':
      case 'language':
        navigation.navigate('Settings');
        break;
      case 'help':
        navigation.navigate('Help');
        break;
      case 'about':
        navigation.navigate('About');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>JK</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>John Kamau</Text>
        <Text style={styles.userPhone}>+254 7XX XXX XXX</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>KSh 2.4K</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.quickAction, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={[styles.quickIcon, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="person" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.quickLabel, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.surface }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.accent + '20' }]}>
            <Ionicons name="star" size={20} color={colors.accent} />
          </View>
          <Text style={[styles.quickLabel, { color: colors.text }]}>Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickAction, { backgroundColor: colors.surface }]}>
          <View style={[styles.quickIcon, { backgroundColor: colors.success + '20' }]}>
            <Ionicons name="gift" size={20} color={colors.success} />
          </View>
          <Text style={[styles.quickLabel, { color: colors.text }]}>Refer</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Toggle */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={toggleTheme}
        >
          <View style={styles.themeInfo}>
            <View style={[styles.themeIcon, { backgroundColor: isDark ? colors.accent + '20' : colors.primary + '20' }]}>
              <Ionicons 
                name={isDark ? 'moon' : 'sunny'} 
                size={20} 
                color={isDark ? colors.accent : colors.primary} 
              />
            </View>
            <View>
              <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.themeDesc, { color: colors.textMuted }]}>
                {isDark ? 'Currently on' : 'Currently off'}
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, { backgroundColor: isDark ? colors.primary : colors.border }]}>
            <View style={[styles.toggleKnob, { 
              backgroundColor: '#fff',
              transform: [{ translateX: isDark ? 20 : 0 }]
            }]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                { backgroundColor: colors.surface, borderColor: colors.border },
                index === 0 && styles.menuItemFirst,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item.id)}
            >
              <View style={[styles.menuIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              {item.badge && (
                <View style={[styles.badge, { backgroundColor: colors.accent + '20' }]}>
                  <Text style={[styles.badgeText, { color: colors.accentDark }]}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.danger + '15' }]} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={[styles.version, { color: colors.textMuted }]}>
        Ma3 v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D2D',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeDesc: {
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
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  menuItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  menuItemLast: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 30,
  },
});
