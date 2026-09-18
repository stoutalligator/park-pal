import { NavigatorScreenParams } from '@react-navigation/native';
import { TripType } from '@/types';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ParksTab: undefined;
  LogTrip: NavigatorScreenParams<LogTripStackParamList>;
  TripsTab: undefined;
  ProfileTab: undefined;
};

export type LogTripStackParamList = {
  TripChooser: undefined;
  LogTripForm: {
    parkId?: string;
    tripId?: string;
    completeTripId?: string;
    initialTripType?: TripType;
  } | undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ParkDetail: { parkId: string };
  ParkTrails: { parkId: string };
  ParkAnimals: { parkId: string };
  TrailDetail: { trailId: string };
  AnimalDetail: { animalId: string };
};

export type ParksStackParamList = {
  Explore: undefined;
  ParkDetail: { parkId: string };
  ParkTrails: { parkId: string };
  ParkAnimals: { parkId: string };
  TrailDetail: { trailId: string };
  AnimalDetail: { animalId: string };
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
  PhotoAlbum: undefined;
  Settings: undefined;
  EditProfile: undefined;
  EditGoal: undefined;
  Units: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};
