import { supabase } from '@/lib/supabase';
import { Trail, Animal, TrailDetail, AnimalDetail, ElevationPoint } from '@/types';
import { ALL_TRAILS } from '@/data/trails';
import { ALL_ANIMALS } from '@/data/animals';
import { TRAIL_DETAILS } from '@/data/trailDetails';
import { ANIMAL_DETAILS } from '@/data/animalDetails';

export interface ContentBundle {
  trails: Trail[];
  animals: Animal[];
  trailDetails: Record<string, TrailDetail>;
  animalDetails: Record<string, AnimalDetail>;
}

interface TrailRow {
  id: string;
  park_id: string;
  name: string;
  description: string;
  miles: number;
  elevation_gain_ft: number;
  difficulty: string;
}

interface AnimalRow {
  id: string;
  park_id: string;
  name: string;
  description: string;
  rarity: string;
}

interface TrailDetailRow {
  id: string;
  estimated_time: string;
  best_season: string;
  tags: string[];
  trail_tip: string;
  did_you_know: string;
  elevation_profile: ElevationPoint[];
  last_verified: string | null;
}

interface AnimalDetailRow {
  id: string;
  scientific_name: string;
  best_time_of_day: string;
  best_season: string;
  where_to_look: string;
  tags: string[];
  viewing_tip: string;
  did_you_know: string;
  last_verified: string | null;
}

function mapTrailRow(row: TrailRow): Trail {
  return {
    id: row.id,
    parkId: row.park_id,
    name: row.name,
    description: row.description,
    miles: row.miles,
    elevationGainFt: row.elevation_gain_ft,
    difficulty: row.difficulty as Trail['difficulty'],
  };
}

function mapAnimalRow(row: AnimalRow): Animal {
  return {
    id: row.id,
    parkId: row.park_id,
    name: row.name,
    description: row.description,
    rarity: row.rarity as Animal['rarity'],
  };
}

function mapTrailDetailRow(row: TrailDetailRow): TrailDetail {
  return {
    id: row.id,
    estimatedTime: row.estimated_time,
    bestSeason: row.best_season,
    tags: row.tags,
    trailTip: row.trail_tip,
    didYouKnow: row.did_you_know,
    elevationProfile: row.elevation_profile,
    lastVerified: row.last_verified ?? undefined,
  };
}

function mapAnimalDetailRow(row: AnimalDetailRow): AnimalDetail {
  return {
    id: row.id,
    scientificName: row.scientific_name,
    bestTimeOfDay: row.best_time_of_day,
    bestSeason: row.best_season,
    whereToLook: row.where_to_look,
    tags: row.tags,
    viewingTip: row.viewing_tip,
    didYouKnow: row.did_you_know,
    lastVerified: row.last_verified ?? undefined,
  };
}

// Fetches trail/animal content (and its research enrichment) from Supabase,
// falling back to the bundled static data on any error or empty result —
// covers an unseeded table, a Supabase outage, or offline use, so the app
// never ends up with zero cards.
export async function fetchContentBundle(): Promise<ContentBundle> {
  const [trailsRes, animalsRes, trailDetailsRes, animalDetailsRes] = await Promise.all([
    supabase.from('trails').select('id, park_id, name, description, miles, elevation_gain_ft, difficulty'),
    supabase.from('animals').select('id, park_id, name, description, rarity'),
    supabase.from('trail_details').select('*'),
    supabase.from('animal_details').select('*'),
  ]);

  const trails =
    !trailsRes.error && trailsRes.data && trailsRes.data.length > 0
      ? (trailsRes.data as TrailRow[]).map(mapTrailRow)
      : ALL_TRAILS;

  const animals =
    !animalsRes.error && animalsRes.data && animalsRes.data.length > 0
      ? (animalsRes.data as AnimalRow[]).map(mapAnimalRow)
      : ALL_ANIMALS;

  const trailDetails =
    !trailDetailsRes.error && trailDetailsRes.data && trailDetailsRes.data.length > 0
      ? Object.fromEntries((trailDetailsRes.data as TrailDetailRow[]).map(mapTrailDetailRow).map((d) => [d.id, d]))
      : TRAIL_DETAILS;

  const animalDetails =
    !animalDetailsRes.error && animalDetailsRes.data && animalDetailsRes.data.length > 0
      ? Object.fromEntries((animalDetailsRes.data as AnimalDetailRow[]).map(mapAnimalDetailRow).map((d) => [d.id, d]))
      : ANIMAL_DETAILS;

  return { trails, animals, trailDetails, animalDetails };
}
