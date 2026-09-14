import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Lets code outside the navigator tree (e.g. the badge-earned celebration,
// which is mounted as a sibling of NavigationContainer) trigger navigation.
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
