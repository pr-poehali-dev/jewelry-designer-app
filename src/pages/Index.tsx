import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type JewelryType = 'earrings' | 'bracelet' | 'necklace' | 'choker' | null;
type BaseType = 'hook' | 'hoop' | 'stud' | null;
type ColorType = 'gold' | 'silver' | 'rose-gold' | 'graphite' | null;
type CharmStyle = 'geometric' | 'sea' | 'pearl' | 'minimal';

interface Charm {
  id: string;
  style: CharmStyle;
  icon: string;
  image?: string;
}

const categories = [
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

const bases = [
  { 
    id: 'hook' as const, 
    name: 'Крючок', 
    price: 1200, 
    icon: 'Anchor',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80'
  },
  { 
    id: 'hoop' as const, 
    name: 'Кольцо-конго', 
    price: 1500, 
    icon: 'CircleDot',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&q=80'
  },
  { 
    id: 'stud' as const, 
    name: 'Гвоздик', 
    price: 1000, 
    icon: 'Disc',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80'
  }
];

const colors = [
  { id: 'gold' as const, name: 'Золото', hex: '#D4AF37' },
  { id: 'silver' as const, name: 'Серебро', hex: '#C0C0C0' },
  { id: 'rose-gold' as const, name: 'Розовое золото', hex: '#E0BFB8' },
  { id: 'graphite' as const, name: 'Графит', hex: '#4A4A4A' }
];

const charms: Charm[] = [
  { id: '1', style: 'geometric', icon: 'Triangle', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=200&q=80' },
  { id: '2', style: 'geometric', icon: 'Square', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&q=80' },
  { id: '3', style: 'geometric', icon: 'Circle', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&q=80' },
  { id: '4', style: 'sea', icon: 'Waves', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&q=80' },
  { id: '5', style: 'sea', icon: 'Shell', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80' },
  { id: '6', style: 'pearl', icon: 'CircleDot', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80' },
  { id: '7', style: 'pearl', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=200&q=80' },
  { id: '8', style: 'minimal', icon: 'Minus', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80' },
  { id: '9', style: 'minimal', icon: 'Plus', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&q=80' }
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [jewelryType, setJewelryType] = useState<JewelryType>(null);
  const [baseType, setBaseType] = useState<BaseType>(null);
  const [colorType, setColorType] = useState<ColorType>(null);
  const [selectedCharms, setSelectedCharms] = useState<Charm[]>([]);

  const progress = (step / 4) * 100;

  const handleCategorySelect = (type: JewelryType) => {
    setJewelryType(type);
    setStep(1);
  };

  const handleBaseSelect = (base: BaseType) => {
    setBaseType(base);
    setStep(2);
  };

  const handleColorSelect = (color: ColorType) => {
    setColorType(color);
    setStep(3);
  };

  const handleCharmToggle = (charm: Charm) => {
    setSelectedCharms(prev => {
      const exists = prev.find(c => c.id === charm.id);
      if (exists) {
        return prev.filter(c => c.id !== charm.id);
      }
      return [...prev, charm];
    });
  };

  const handleRandomize = () => {
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...charms].sort(() => Math.random() - 0.5);
    setSelectedCharms(shuffled.slice(0, randomCount));
  };

  const handleFinish = () => {
    setStep(4);
  };

  const calculatePrice = () => {
    const basePrice = bases.find(b => b.id === baseType)?.price || 0;
    const charmPrice = selectedCharms.length * 300;
    return basePrice + charmPrice;
  };

  const handleReset = () => {
    setStep(0);
    setJewelryType(null);
    setBaseType(null);
    setColorType(null);
    setSelectedCharms([]);
  };

  const getColorHex = () => {
    return colors.find(c => c.id === colorType)?.hex || '#D4AF37';
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto px-4 pt-8">
        {step === 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-3">Модер Novo</h1>
              <p className="text-muted-foreground text-lg">Создай украшение в своём стиле</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-card border-border"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-full h-32 overflow-hidden bg-secondary">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-foreground pb-4">{category.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step > 0 && step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(Math.max(0, step - 1))}
                className="text-muted-foreground"
              >
                <Icon name="ChevronLeft" size={20} />
                Назад
              </Button>
              <span className="text-sm text-muted-foreground">Шаг {step} из 4</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Выберите основу
            </h2>

            <div className="space-y-4">
              {bases.map((base) => (
                <Card
                  key={base.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
                    baseType === base.id ? 'border-2 border-foreground bg-accent' : 'border-border bg-card'
                  }`}
                  onClick={() => handleBaseSelect(base.id)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <img 
                          src={base.image} 
                          alt={base.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">{base.name}</p>
                        <p className="text-muted-foreground text-sm">{base.price} ₽</p>
                      </div>
                    </div>
                    {baseType === base.id && (
                      <Icon name="Check" size={24} className="text-foreground" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {baseType && (
              <Button
                className="w-full mt-8 h-14 text-lg rounded-2xl"
                onClick={() => setStep(2)}
              >
                Далее
              </Button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Выберите цвет
            </h2>

            <div className="mb-12 flex justify-center">
              <div 
                className="w-48 h-48 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 relative"
              >
                <img 
                  src={bases.find(b => b.id === baseType)?.image} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                  style={{ filter: `hue-rotate(${colorType === 'rose-gold' ? '20deg' : colorType === 'graphite' ? '180deg' : '0deg'}) brightness(${colorType === 'silver' ? '1.1' : '1'})` }}
                />
                <div 
                  className="absolute inset-0 mix-blend-overlay opacity-40"
                  style={{ backgroundColor: getColorHex() }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`aspect-square rounded-2xl transition-all duration-300 hover:scale-110 ${
                    colorType === color.id ? 'ring-4 ring-foreground ring-offset-4' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorSelect(color.id)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <p
                  key={color.id}
                  className={`text-center text-sm ${
                    colorType === color.id ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {color.name}
                </p>
              ))}
            </div>

            {colorType && (
              <Button
                className="w-full mt-8 h-14 text-lg rounded-2xl"
                onClick={() => setStep(3)}
              >
                Далее
              </Button>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-3 text-center">
              Добавьте детали
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Элементы, которые отражают вас
            </p>

            <div className="mb-8 p-8 bg-secondary rounded-3xl min-h-[200px] flex flex-wrap gap-3 items-center justify-center">
              {selectedCharms.length === 0 ? (
                <p className="text-muted-foreground text-sm">Выберите элементы ниже</p>
              ) : (
                selectedCharms.map((charm) => (
                  <div
                    key={charm.id}
                    className="w-14 h-14 rounded-xl overflow-hidden transition-all hover:scale-110 border-2"
                    style={{ borderColor: getColorHex() }}
                  >
                    <img 
                      src={charm.image} 
                      alt="charm"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Галерея элементов</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRandomize}
                  className="rounded-xl"
                >
                  <Icon name="Shuffle" size={16} className="mr-2" />
                  Случайный выбор
                </Button>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {charms.map((charm) => {
                  const isSelected = selectedCharms.find(c => c.id === charm.id);
                  return (
                    <button
                      key={charm.id}
                      className={`aspect-square rounded-xl border-2 overflow-hidden transition-all hover:scale-110 ${
                        isSelected
                          ? 'border-foreground ring-2 ring-foreground'
                          : 'border-border'
                      }`}
                      onClick={() => handleCharmToggle(charm)}
                    >
                      <img 
                        src={charm.image} 
                        alt="charm"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              className="w-full mt-6 h-14 text-lg rounded-2xl"
              onClick={handleFinish}
            >
              Готово
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Ваше украшение
            </h2>

            <Card className="p-8 mb-8 bg-card border-border">
              <div className="flex justify-center mb-8">
                <div className="w-64 h-64 rounded-3xl shadow-2xl overflow-hidden relative">
                  <img 
                    src={bases.find(b => b.id === baseType)?.image} 
                    alt="Jewelry preview"
                    className="w-full h-full object-cover"
                    style={{ filter: `hue-rotate(${colorType === 'rose-gold' ? '20deg' : colorType === 'graphite' ? '180deg' : '0deg'}) brightness(${colorType === 'silver' ? '1.1' : '1'})` }}
                  />
                  <div 
                    className="absolute inset-0 mix-blend-overlay opacity-30"
                    style={{ backgroundColor: getColorHex() }}
                  />
                  <div className="absolute inset-0 flex flex-wrap gap-2 items-center justify-center p-6">
                    {selectedCharms.map((charm, idx) => (
                      <div
                        key={charm.id}
                        className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-lg"
                        style={{
                          transform: `rotate(${idx * 15}deg)`,
                        }}
                      >
                        <img 
                          src={charm.image} 
                          alt="charm"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Категория</p>
                  <p className="font-semibold text-foreground">
                    {categories.find(c => c.id === jewelryType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Основа</p>
                  <p className="font-semibold text-foreground">
                    {bases.find(b => b.id === baseType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Цвет</p>
                  <p className="font-semibold text-foreground">
                    {colors.find(c => c.id === colorType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Элементы</p>
                  <p className="font-semibold text-foreground">
                    {selectedCharms.length} шт.
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-2xl font-bold text-foreground">
                    {calculatePrice()} ₽
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button className="w-full h-14 text-lg rounded-2xl">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 rounded-2xl">
                  <Icon name="Heart" size={18} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" className="h-12 rounded-2xl">
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full h-12 rounded-2xl text-muted-foreground"
                onClick={handleReset}
              >
                Создать новое украшение
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;