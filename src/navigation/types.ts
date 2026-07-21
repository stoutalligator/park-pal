import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ParksTab: undefined;
  LogTrip: { parkId?: string; tripId?: string } | undefined;
  TripsTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ParkDetail: { parkId: string };
  ParkTrails: { parkId: string };
  ParkAnimals: { parkId: string };
};

export type ParksStackParamList = {
  Explore: undefined;
  ParkDetail: { parkId: string };
  ParkTrails: { parkId: string };
  ParkAnimals: { parkId: string };
};

export type TripsStackParamList = {
  Trips: undefined;
  TripDetail: { tripId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Passport: undefined;
  Collection: undefined;
  Stats: undefined;
  Wishlist: undefined;
  Settings: undefined;
  EditProfile: undefined;
  EditGoal: undefined;
  Units: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
};
