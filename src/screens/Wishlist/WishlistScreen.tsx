import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { getParkImage } from '@/data/parkImages';
import EmptyState from '@/components/EmptyState';
import ScreenHeader from '@/components/ScreenHeader';

function CheckIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 16 16">
      <Polyline points="3,8 6.5,11.5 13,4" fill="none" stroke={colors.primary} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function WishlistScreen() {
  const { parks, updateParkStatus } = useApp();
  const navigation = useNavigation<any>();
  const wishlist = parks.filter((p) => p.status === 'bucketList');

  const goToPark = (parkId: string) => {
    navigation.navigate('ParksTab', { screen: 'ParkDetail', params: { parkId } });
  };

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Bucket List" onBack={() => navigation.goBack()} />
        <EmptyState title="Dream up your next adventure." subtitle="Add parks to your bucket list from the Parks tab." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Bucket List" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {wishlist.map((park) => (
          <TouchableOpacity key={park.id} style={styles.card} activeOpacity={0.85} onPress={() => goToPark(park.id)}>
            <Image source={getParkImage(park.id)} style={styles.cardIcon} resizeMode="cover" />
            <View style={styles.cardInfo}>
              <Text style={styles.parkName}>{park.name}</Text>
              <Text style={styles.parkState}>{park.state}</Text>
            </View>
            <TouchableOpacity
              style={styles.visitedBtn}
              onPress={() => updateParkStatus(park.id, 'visited')}
              hitSlop={6}
            >
              <CheckIcon />
              <Text style={styles.visitedBtnText}>Visited</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing['5xl'], gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, gap: spacing.md, ...shadows.sm },
  cardIcon: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  cardInfo: { flex: 1 },
  parkName: { ...typography.labelBold, color: colors.textPrimary },
  parkState: { ...typography.caption, color: colors.textSecondary },
  visitedBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.surfaceWarm, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: 1.5, borderColor: colors.primary },
  visitedBtnText: { ...typography.labelSmall, color: colors.primary },
});
