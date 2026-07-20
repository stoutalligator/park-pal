/**
 * Places park pins onto the illustrated US map (src/assets/maps/us-map.png).
 * The artwork isn't geographically precise (Alaska, Hawaii, and a few extra
 * islands are drawn in artistic — not accurate — positions), so pin
 * placement is calibrated per-region against the actual pixel bounding box
 * of each landmass in that specific image, rather than a true projection.
 *
 * Coordinates here are returned in "cropped image space" (origin at the top
 * of the crop, native 1:1 pixels) — the consuming component measures its
 * own available space and applies a dynamic scale so the whole map fits
 * without scrolling.
 */

// Native pixel dimensions of src/assets/maps/us-map.png
export const IMAGE_WIDTH = 1024;
export const IMAGE_HEIGHT = 1536;

// The artwork has large blank margins above Alaska and below the islands;
// crop those out so the displayed map is mostly content.
export const CROP_TOP = 170;
const CROP_BOTTOM = 1160;
export const CROPPED_WIDTH = IMAGE_WIDTH;
export const CROPPED_HEIGHT = CROP_BOTTOM - CROP_TOP;

// Pixel bounding box (in the original 1024x1536 artwork) of each drawn landmass.
const CONTINENTAL_PIXEL_BOX = { x0: 72, y0: 432, x1: 1000, y1: 1016 };
const ALASKA_PIXEL_BOX = { x0: 16, y0: 192, x1: 352, y1: 424 };

const CONTINENTAL_BOUNDS = { minLat: 24.5, maxLat: 49.5, minLng: -125, maxLng: -66.5 };
const ALASKA_BOUNDS = { minLat: 57.5, maxLat: 68.5, minLng: -160, maxLng: -136 };

// Hawaii, American Samoa, and the Virgin Islands are each drawn as a
// single small island with only 1-2 parks apiece — not worth a projected
// bounding box, so their pixel positions are hand-placed on the artwork.
//
// A handful of continental parks are hand-placed too: the straight lat/lng
// projection is a reasonable approximation everywhere, but a few regions
// (Florida's peninsula, the Great Lakes, the Maine coast) are drawn with
// enough artistic license that the linear formula visibly misses the
// illustrated landmass there. Everything else stays on the general formula.
const FIXED_PARK_PIXELS: Record<string, { x: number; y: number }> = {
  haleakala: { x: 290, y: 1015 },
  'hawaii-volcanoes': { x: 318, y: 1055 },
  'national-park-samoa': { x: 134, y: 1036 },
  'virgin-islands': { x: 790, y: 1090 },

  // Florida peninsula
  everglades: { x: 828, y: 985 },
  biscayne: { x: 850, y: 965 },
  'dry-tortugas': { x: 758, y: 1012 },

  // Great Lakes
  'isle-royale': { x: 636, y: 518 },
  voyageurs: { x: 588, y: 498 },
  'cuyahoga-valley': { x: 762, y: 648 },
  'indiana-dunes': { x: 658, y: 645 },

  // Maine coast
  acadia: { x: 958, y: 488 },
};

function project(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  box: { x0: number; y0: number; x1: number; y1: number }
) {
  const xRatio = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
  const yRatio = 1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
  return {
    x: box.x0 + Math.min(1, Math.max(0, xRatio)) * (box.x1 - box.x0),
    y: box.y0 + Math.min(1, Math.max(0, yRatio)) * (box.y1 - box.y0),
  };
}

/** Returns cropped-image-space {x, y} (unscaled) for a park's pin. */
export function projectPark(parkId: string, lat: number, lng: number, state: string): { x: number; y: number } {
  let imgX: number;
  let imgY: number;

  if (FIXED_PARK_PIXELS[parkId]) {
    ({ x: imgX, y: imgY } = FIXED_PARK_PIXELS[parkId]);
  } else if (state === 'Alaska') {
    ({ x: imgX, y: imgY } = project(lat, lng, ALASKA_BOUNDS, ALASKA_PIXEL_BOX));
  } else {
    ({ x: imgX, y: imgY } = project(lat, lng, CONTINENTAL_BOUNDS, CONTINENTAL_PIXEL_BOX));
  }

  return { x: imgX, y: imgY - CROP_TOP };
}

/**
 * Nudges apart any points closer together than `minDistance` so pins never
 * fully overlap in dense clusters (e.g. Utah's "Mighty 5", the Bay Area
 * parks). Runs a few relaxation passes rather than a single pass since
 * resolving one overlap can create a new one with a neighboring pin.
 */
export function resolveOverlaps<T extends { x: number; y: number }>(points: T[], minDistance: number): T[] {
  const result = points.map((p) => ({ ...p }));

  for (let iteration = 0; iteration < 8; iteration++) {
    let movedAny = false;
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        let dx = result[j].x - result[i].x;
        let dy = result[j].y - result[i].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          movedAny = true;
          if (dist < 0.001) {
            // identical positions — nudge apart in a deterministic direction
            const angle = ((i + j) * 47) % 360;
            dx = Math.cos((angle * Math.PI) / 180);
            dy = Math.sin((angle * Math.PI) / 180);
            dist = 1;
          }
          const push = (minDistance - dist) / 2;
          const ux = dx / dist;
          const uy = dy / dist;
          result[i].x -= ux * push;
          result[i].y -= uy * push;
          result[j].x += ux * push;
          result[j].y += uy * push;
        }
      }
    }
    if (!movedAny) break;
  }

  return result;
}
