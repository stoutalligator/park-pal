import { Units } from '@/types';

const MILES_PER_KM = 0.621371;
const FEET_PER_METER = 3.28084;

export function distanceLabel(units: Units): 'mi' | 'km' {
  return units === 'km' ? 'km' : 'mi';
}

export function elevationLabel(units: Units): 'ft' | 'm' {
  return units === 'km' ? 'm' : 'ft';
}

export function convertMiles(miles: number, units: Units): number {
  return units === 'km' ? miles / MILES_PER_KM : miles;
}

export function convertFeet(feet: number, units: Units): number {
  return units === 'km' ? feet / FEET_PER_METER : feet;
}

export function toMiles(value: number, units: Units): number {
  return units === 'km' ? value * MILES_PER_KM : value;
}

export function toFeet(value: number, units: Units): number {
  return units === 'km' ? value * FEET_PER_METER : value;
}

export function formatDistance(miles: number, units: Units): string {
  return `${convertMiles(miles, units).toFixed(1)} ${distanceLabel(units)}`;
}

export function formatElevation(feet: number, units: Units): string {
  return `${Math.round(convertFeet(feet, units)).toLocaleString()} ${elevationLabel(units)}`;
}
