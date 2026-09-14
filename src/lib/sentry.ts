import * as Sentry from '@sentry/react-native';

const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

// A missing DSN (local dev, or before the project is set up on sentry.io)
// leaves Sentry uninitialized rather than throwing — captureException below
// becomes a no-op in that case.
export function initSentry() {
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.2,
    enableAutoSessionTracking: true,
  });
}

export function captureException(error: unknown, context?: Record<string, unknown>) {
  if (!dsn) return;
  Sentry.captureException(error, context ? { extra: context } : undefined);
}
