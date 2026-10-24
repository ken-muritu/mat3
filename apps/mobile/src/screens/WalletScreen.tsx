import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const transactions = [
  { id: 1, type: 'payment', desc: 'Thika - CBD', amount: -100, date: 'Today, 8:30 AM' },
  { id: 2, type: 'topup', desc: 'M-Pesa Top Up', amount: 500, date: 'Yesterday, 2:15 PM' },
  { id: 3, type: 'payment', desc: 'Ruiru - CBD', amount: -80, date: 'Yesterday, 7:45 AM' },
  { id: 4, type: 'cashback', desc: 'Ride Cashback', amount: 10, date: 'Jan 28, 6:00 PM' },
  { id: 5, type: 'payment', desc: 'CBD - Westlands', amount: -50, date: 'Jan 28, 1:30 PM' },
];

export default function WalletScreen() {
  const { colors } = useTheme();

  const handleTopUp = (amount?: number) => {
    Alert.alert(
      'Top Up Wallet',
      amount ? `Add KSh ${amount} to your wallet via M-Pesa?` : 'Enter amount to top up',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => Alert.alert('Success', 'M-Pesa prompt sent to your phone') },
      ]
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Funds',
      'Transfer balance to your M-Pesa account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Withdraw', onPress: () => Alert.alert('Success', 'Withdrawal initiated') },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Refer & Earn', 'Share your referral code: MA3FRIEND with friends to earn KSh 100 each!');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup':
        return 'arrow-down-circle';
      case 'cashback':
        return 'gift';
      default:
        return 'bus';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'topup':
      case 'cashback':
        return colors.success;
      default:
        return colors.primary;
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Balance Card */}
      <View style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>KSh 500</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.balanceAction} onPress={() => handleTopUp()}>
            <View style={styles.actionIcon}>
              <Ionicons name="add" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.balanceAction} onPress={handleWithdraw}>
            <View style={styles.actionIcon}>
              <Ionicons name="arrow-up" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.balanceAction} onPress={() => Alert.alert('Transaction History', 'View all your transactions below')}>
            <View style={styles.actionIcon}>
              <Ionicons name="time" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Top Up</Text>
        <View style={styles.quickAmounts}>
          {[100, 200, 500, 1000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.quickAmount, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleTopUp(amount)}
            >
              <Text style={[styles.quickAmountText, { color: colors.text }]}>KSh {amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Methods</Text>
        <TouchableOpacity style={[styles.paymentMethod, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.paymentIcon, { backgroundColor: '#4CAF50' + '20' }]}>
            <Ionicons name="phone-portrait" size={20} color="#4CAF50" />
          </View>
          <View style={styles.paymentInfo}>
            <Text style={[styles.paymentName, { color: colors.text }]}>M-Pesa</Text>
            <Text style={[styles.paymentNumber, { color: colors.textMuted }]}>+254 7XX XXX XXX</Text>
          </View>
          <View style={[styles.defaultBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.defaultText, { color: colors.primary }]}>Default</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.addPayment, { borderColor: colors.border }]}>
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          <Text style={[styles.addPaymentText, { color: colors.primary }]}>Add Payment Method</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions.map((tx) => (
          <View
            key={tx.id}
            style={[styles.transaction, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <View style={[styles.txIcon, { backgroundColor: getTransactionColor(tx.type) + '20' }]}>
              <Ionicons name={getTransactionIcon(tx.type) as any} size={20} color={getTransactionColor(tx.type)} />
            </View>
            <View style={styles.txInfo}>
              <Text style={[styles.txDesc, { color: colors.text }]}>{tx.desc}</Text>
              <Text style={[styles.txDate, { color: colors.textMuted }]}>{tx.date}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.amount > 0 ? colors.success : colors.text }]}>
              {tx.amount > 0 ? '+' : ''}KSh {Math.abs(tx.amount)}
            </Text>
          </View>
        ))}
      </View>

      {/* Promo */}
      <View style={[styles.promoCard, { backgroundColor: colors.accent + '20' }]}>
        <Ionicons name="gift" size={32} color={colors.accent} />
        <View style={styles.promoContent}>
          <Text style={[styles.promoTitle, { color: colors.text }]}>Refer & Earn</Text>
          <Text style={[styles.promoDesc, { color: colors.textMuted }]}>
            Get KSh 100 for every friend you refer
          </Text>
        </View>
        <TouchableOpacity style={[styles.promoBtn, { backgroundColor: colors.accent }]} onPress={handleShare}>
          <Text style={styles.promoBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    borderRadius: 20,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  balanceAction: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAmount: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  paymentIcon: {
    width: 44,
    height: 44,
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
    fontWeight: '600',
  },
  paymentNumber: {
    fontSize: 13,
    marginTop: 2,
  },
  defaultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addPayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 8,
  },
  addPaymentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
    marginLeft: 12,
  },
  txDesc: {
    fontSize: 15,
    fontWeight: '500',
  },
  txDate: {
    fontSize: 12,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  promoDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  promoBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoBtnText: {
    color: '#004D2D',
    fontWeight: '600',
    fontSize: 14,
  },
});
