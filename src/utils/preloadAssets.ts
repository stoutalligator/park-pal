import { Asset } from 'expo-asset';
import { ALL_IMAGE_ASSETS } from '@/data/assetManifest';

export async function preloadAssets(onProgress?: (fraction: number) => void): Promise<void> {
  const total = ALL_IMAGE_ASSETS.length;
  let loaded = 0;

  await Promise.all(
    ALL_IMAGE_ASSETS.map(async (moduleId) => {
      try {
        await Asset.fromModule(moduleId).downloadAsync();
      } finally {
        loaded += 1;
        onProgress?.(loaded / total);
      }
    })
  );
}
