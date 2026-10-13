import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { colors, spacing, radius, shadows, typography } from '@/theme';
import { ParkAlert } from '@/types';
import { ALERTS_STALE_AFTER_MS, alertSeverity, formatAlertsUpdated } from '@/data/npsAlerts';

interface Props {
  alerts: ParkAlert[];
  syncedAt: string | null;
  /** nps.gov park code, for the "all alerts" link. */
  npsCode?: string;
  title?: string;
}

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  Danger: { bg: colors.rose, text: colors.textInverse },
  'Park Closure': { bg: colors.orange, text: colors.textInverse },
  Caution: { bg: colors.tan, text: colors.brownDark },
  Information: { bg: colors.sky, text: colors.textPrimary },
};

// Short labels for the collapsed count bubbles, most severe first.
const BUBBLE_ORDER: { category: string; label: string }[] = [
  { category: 'Danger', label: 'Danger' },
  { category: 'Park Closure', label: 'Closure' },
  { category: 'Caution', label: 'Caution' },
  { category: 'Information', label: 'Info' },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" style={open ? styles.chevronOpen : undefined}>
      <Path d="M3 5l4 4 4-4" fill="none" stroke={colors.textSecondary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AlertIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path d="M12 3.2 22 20H2z" fill="none" stroke={color} strokeWidth={1.9} strokeLinejoin="round" />
      <Line x1={12} y1={9.5} x2={12} y2={14} stroke={color} strokeWidth={1.9} strokeLinecap="round" />
      <Circle cx={12} cy={16.9} r={1.1} fill={color} />
    </Svg>
  );
}

// Live alerts straight from the National Park Service, shown verbatim and
// labeled as NPS content — deliberately styled apart from Parks Pal's own
// written tips (which carry the mascot) so the two are never confused.
export default function NpsAlertsCard({ alerts, syncedAt, npsCode, title = 'NPS Alerts' }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  if (alerts.length === 0) return null;

  const stale = !!syncedAt && Date.now() - new Date(syncedAt).getTime() > ALERTS_STALE_AFTER_MS;
  const accent = alertSeverity(alerts[0].category) <= 1 ? colors.orange : colors.tan;
  const counts = BUBBLE_ORDER.map((b) => ({
    ...b,
    count: alerts.filter((a) => (CATEGORY_STYLE[a.category] ? a.category : 'Information') === b.category).length,
  })).filter((b) => b.count > 0);

  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      {/* Collapsed by default: just the counts, tap to read the alerts. */}
      <TouchableOpacity style={styles.header} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <AlertIcon color={accent} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.source, stale && styles.sourceStale]}>
            From NPS.gov · {formatAlertsUpdated(syncedAt)}
            {stale ? ' · may be out of date' : ''}
          </Text>
          <View style={styles.bubbles}>
            {counts.map((b) => (
              <View key={b.category} style={[styles.pill, { backgroundColor: CATEGORY_STYLE[b.category].bg }]}>
                <Text style={[styles.pillText, { color: CATEGORY_STYLE[b.category].text }]}>
                  {b.count} {b.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Chevron open={open} />
      </TouchableOpacity>

      {open && alerts.map((alert) => {
        const style = CATEGORY_STYLE[alert.category] ?? CATEGORY_STYLE.Information;
        const full = expanded === alert.id;
        return (
          <TouchableOpacity
            key={alert.id}
            style={styles.alert}
            onPress={() => setExpanded(full ? null : alert.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.pill, { backgroundColor: style.bg }]}>
              <Text style={[styles.pillText, { color: style.text }]}>{alert.category}</Text>
            </View>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            {alert.description ? (
              <Text style={styles.alertBody} numberOfLines={full ? undefined : 2}>
                {alert.description}
              </Text>
            ) : null}
            {full && (
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(alert.url || (npsCode ? `https://www.nps.gov/${npsCode}/planyourvisit/conditions.htm` : 'https://www.nps.gov'))
                }
              >
                Read on NPS.gov {'›'}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.sm,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerText: { flex: 1, gap: 2 },
  bubbles: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xs },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  title: { ...typography.labelBold, color: colors.textPrimary },
  source: { ...typography.caption, color: colors.textMuted },
  sourceStale: { color: colors.orange },
  alert: { gap: 4, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.divider },
  pill: { alignSelf: 'flex-start', borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  pillText: { ...typography.labelSmall, fontSize: 11 },
  alertTitle: { ...typography.labelSemiBold, color: colors.textPrimary },
  alertBody: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 19 },
  link: { ...typography.labelSemiBold, color: colors.primary, marginTop: 2 },
});
