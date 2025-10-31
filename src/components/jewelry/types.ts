export type JewelryType = 'earrings' | 'bracelet' | 'necklace' | 'choker' | null;
export type HookType = 'triangle' | 'square' | 'circle' | 'spiral' | null;
export type ColorType = 'gold' | 'silver' | 'graphite' | null;
export type CharmStyle = 'geometric' | 'sea' | 'pearl' | 'minimal' | 'nature' | 'abstract';

export interface Charm {
  id: string;
  style: CharmStyle;
  name: string;
  image: string;
  price: number;
}

export interface AttachedCharm extends Charm {
  position: { x: number; y: number };
}

export interface Category {
  id: JewelryType;
  name: string;
  icon: string;
  image: string;
}

export interface Hook {
  id: HookType;
  name: string;
  diameter: string;
  price: number;
  image: string;
  description: string;
}

export interface Color {
  id: ColorType;
  name: string;
  hex: string;
}
