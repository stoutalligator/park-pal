import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ParksTab: undefined;
  LogTrip: undefined;
  TripsTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ParkDetail: { parkId: string };
};

export type ParksStackParamList = {
  Explore: undefined;
  ParkDetail: { parkId: string };
};

export type TripsStackParamList = {
  Trips: undefined;
  TripDetail: { tripId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Passport: undefined;
  Collection: undefined;
  Achievements: undefined;
  Stats: undefined;
  Wishlist: undefined;
  Settings: undefined;
};
