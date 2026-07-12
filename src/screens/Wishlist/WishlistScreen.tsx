import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import EmptyState from '@/components/EmptyState';

export default function WishlistScreen() {
  const { parks, updateParkStatus } = useApp();
  const navigation = useNavigation<any>();
  const wishlist = parks.filter((p) => p.status === 'bucketList');

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Wishlist</Text>
          <View style={{ width: 60 }} />
        </View>
        <EmptyState title="Dream up your next adventure." subtitle="Add parks to your bucket list from the Explore tab." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Wishlist</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {wishlist.map((park) => (
          <View key={park.id} style={styles.card}>
            <View style={styles.cardIcon}><Text style={styles.parkEmoji}>🏔️</Text></View>
            <View style={styles.cardInfo}>
              <Text style={styles.parkName}>{park.name}</Text>
              <Text style={styles.parkState}>{park.state}</Text>
            </View>
            <TouchableOpacity
              style={styles.visitedBtn}
              onPress={() => updateParkStatus(park.id, 'visited')}
            >
              <Text style={styles.visitedBtnText}>✓ Visited</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  back: { ...typography.labelSemiBold, color: colors.primary, fontSize: 18 },
  title: { ...typography.h4, color: colors.textPrimary },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing['5xl'], gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: spacing.md, ...shadows.sm },
  cardIcon: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, alignItems: 'center', justifyContent: 'center' },
  parkEmoji: { fontSize: 26 },
  cardInfo: { flex: 1 },
  parkName: { ...typography.labelBold, color: colors.textPrimary },
  parkState: { ...typography.caption, color: colors.textSecondary },
  visitedBtn: { backgroundColor: '#EEF5E8', borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: 1.5, borderColor: colors.primary },
  visitedBtnText: { ...typography.labelSmall, color: colors.primary },
});
