import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Cosmetic } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findRelatedItems = (current: Cosmetic, allItems: Cosmetic[], limit = 4) => {
  const related = new Set<Cosmetic>();
  
  // Same set items first
  if (current.set?.value) {
    allItems
      .filter(item => 
        item.id !== current.id && 
        item.set?.value === current.set?.value
      )
      .forEach(item => related.add(item));
  }

  // Same series items
  if (current.series?.value) {
    allItems
      .filter(item => 
        item.id !== current.id && 
        item.series?.value === current.series?.value && 
        !related.has(item)
      )
      .forEach(item => related.add(item));
  }

  // Same rarity and type
  allItems
    .filter(item =>
      item.id !== current.id &&
      item.rarity.value === current.rarity.value &&
      item.type.value === current.type.value &&
      !related.has(item)
    )
    .forEach(item => related.add(item));

  return Array.from(related).slice(0, limit);
};

export const formatRarityLabel = (rarity: string): string => {
  const labels: Record<string, string> = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    mythic: 'Mythic',
    gaminglegends: 'Gaming Legends',
    marvel: 'Marvel Series',
    starwars: 'Star Wars Series',
    dc: 'DC Series',
    dark: 'Dark Series',
    frozen: 'Frozen Series',
    lava: 'Lava Series',
    shadow: 'Shadow Series',
    icon: 'Icon Series',
  };
  
  return labels[rarity.toLowerCase() as keyof typeof labels] || rarity;
};
