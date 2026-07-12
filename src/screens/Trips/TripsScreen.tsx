import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@/context/AppContext';
import { colors, spacing, typography } from '@/theme';
import TripCard from '@/components/TripCard';
import EmptyState from '@/components/EmptyState';

export default function TripsScreen() {
  const { trips } = useApp();
  const navigation = useNavigation<any>();

  if (trips.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Trips</Text>
        <EmptyState
          title="No adventures logged yet."
          subtitle="Ready to save your first trail memory?"
          actionLabel="Log First Trip"
          onAction={() => navigation.navigate('LogTrip')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trips</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onPress={() => navigation.navigate('TripDetail', { tripId: trip.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  title: { ...typography.h3, color: colors.textPrimary },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing['5xl'] },
});
