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
}

const categories = [
  { id: 'earrings' as const, name: 'Серьги', icon: 'Sparkles' },
  { id: 'bracelet' as const, name: 'Браслет', icon: 'Circle' },
  { id: 'necklace' as const, name: 'Колье', icon: 'Gem' },
  { id: 'choker' as const, name: 'Чокер', icon: 'Star' }
];

const bases = [
  { id: 'hook' as const, name: 'Крючок', price: 1200, icon: 'Anchor' },
  { id: 'hoop' as const, name: 'Кольцо-конго', price: 1500, icon: 'CircleDot' },
  { id: 'stud' as const, name: 'Гвоздик', price: 1000, icon: 'Disc' }
];

const colors = [
  { id: 'gold' as const, name: 'Золото', hex: '#D4AF37' },
  { id: 'silver' as const, name: 'Серебро', hex: '#C0C0C0' },
  { id: 'rose-gold' as const, name: 'Розовое золото', hex: '#E0BFB8' },
  { id: 'graphite' as const, name: 'Графит', hex: '#4A4A4A' }
];

const charms: Charm[] = [
  { id: '1', style: 'geometric', icon: 'Triangle' },
  { id: '2', style: 'geometric', icon: 'Square' },
  { id: '3', style: 'geometric', icon: 'Circle' },
  { id: '4', style: 'sea', icon: 'Waves' },
  { id: '5', style: 'sea', icon: 'Shell' },
  { id: '6', style: 'pearl', icon: 'CircleDot' },
  { id: '7', style: 'pearl', icon: 'Sparkles' },
  { id: '8', style: 'minimal', icon: 'Minus' },
  { id: '9', style: 'minimal', icon: 'Plus' }
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
                  className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-card border-border"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                      <Icon name={category.icon} size={32} className="text-foreground" />
                    </div>
                    <p className="font-medium text-foreground">{category.name}</p>
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
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    baseType === base.id ? 'border-2 border-foreground bg-accent' : 'border-border bg-card'
                  }`}
                  onClick={() => handleBaseSelect(base.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon name={base.icon} size={28} className="text-foreground" />
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
                className="w-48 h-48 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: getColorHex() }}
              >
                <Icon 
                  name={bases.find(b => b.id === baseType)?.icon || 'Sparkles'} 
                  size={80} 
                  className="text-white opacity-80"
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: getColorHex() }}
                  >
                    <Icon name={charm.icon} size={24} className="text-white" />
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
                      className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110 ${
                        isSelected
                          ? 'border-foreground bg-accent'
                          : 'border-border bg-card'
                      }`}
                      onClick={() => handleCharmToggle(charm)}
                    >
                      <Icon name={charm.icon} size={20} className="text-foreground" />
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
                <div
                  className="w-64 h-64 rounded-3xl shadow-2xl flex items-center justify-center relative"
                  style={{ backgroundColor: getColorHex() }}
                >
                  <Icon
                    name={bases.find(b => b.id === baseType)?.icon || 'Sparkles'}
                    size={100}
                    className="text-white opacity-80"
                  />
                  <div className="absolute inset-0 flex flex-wrap gap-2 items-center justify-center p-6">
                    {selectedCharms.map((charm, idx) => (
                      <div
                        key={charm.id}
                        className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        style={{
                          transform: `rotate(${idx * 15}deg)`,
                        }}
                      >
                        <Icon name={charm.icon} size={20} className="text-white" />
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
