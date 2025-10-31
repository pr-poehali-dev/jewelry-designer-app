import { Category, Hook, Color, Charm } from './types';

export const categories: Category[] = [
  { 
    id: 'earrings' as const, 
    name: 'Серьги', 
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80'
  },
  { 
    id: 'bracelet' as const, 
    name: 'Браслет', 
    icon: 'Circle',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80'
  },
  { 
    id: 'necklace' as const, 
    name: 'Колье', 
    icon: 'Gem',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80'
  },
  { 
    id: 'choker' as const, 
    name: 'Чокер', 
    icon: 'Star',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80'
  }
];

export const hooks: Hook[] = [
  { 
    id: 'triangle' as const, 
    name: 'Треугольник', 
    diameter: '18мм',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
    description: 'Швенза треугольной формы'
  },
  { 
    id: 'square' as const, 
    name: 'Квадрат', 
    diameter: '18мм',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&q=80',
    description: 'Швенза квадратной формы'
  },
  { 
    id: 'circle' as const, 
    name: 'Круг', 
    diameter: '18мм',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80',
    description: 'Швенза круглой формы'
  },
  { 
    id: 'spiral' as const, 
    name: 'Спираль', 
    diameter: '18мм',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&q=80',
    description: 'Швенза спиральной формы'
  }
];

export const colors: Color[] = [
  { id: 'gold' as const, name: 'Золото', hex: '#D4AF37' },
  { id: 'silver' as const, name: 'Серебро', hex: '#C0C0C0' },
  { id: 'graphite' as const, name: 'Графит', hex: '#4A4A4A' }
];

export const charms: Charm[] = [
  { id: 'charm-1', style: 'geometric', name: 'Треугольник', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=200&q=80', price: 300 },
  { id: 'charm-2', style: 'geometric', name: 'Квадрат', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&q=80', price: 300 },
  { id: 'charm-3', style: 'geometric', name: 'Круг', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&q=80', price: 300 },
  { id: 'charm-4', style: 'sea', name: 'Волна', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&q=80', price: 350 },
  { id: 'charm-5', style: 'sea', name: 'Ракушка', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80', price: 350 },
  { id: 'charm-6', style: 'pearl', name: 'Жемчуг', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80', price: 400 },
  { id: 'charm-7', style: 'pearl', name: 'Капля', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=200&q=80', price: 400 },
  { id: 'charm-8', style: 'minimal', name: 'Линия', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80', price: 250 },
  { id: 'charm-9', style: 'minimal', name: 'Точка', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&q=80', price: 250 },
  { id: 'charm-10', style: 'nature', name: 'Листок', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=200&q=80', price: 350 },
  { id: 'charm-11', style: 'nature', name: 'Цветок', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80', price: 350 },
  { id: 'charm-12', style: 'abstract', name: 'Звезда', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80', price: 300 }
];
