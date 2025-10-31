import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable, DragStartEvent } from '@dnd-kit/core';

type JewelryType = 'earrings' | 'bracelet' | 'necklace' | 'choker' | null;
type HookType = 'triangle' | 'square' | 'circle' | 'spiral' | null;
type ColorType = 'gold' | 'silver' | 'graphite' | null;
type CharmStyle = 'geometric' | 'sea' | 'pearl' | 'minimal' | 'nature' | 'abstract';

interface Charm {
  id: string;
  style: CharmStyle;
  name: string;
  image: string;
  price: number;
}

interface AttachedCharm extends Charm {
  position: { x: number; y: number };
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

const hooks = [
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

const colors = [
  { id: 'gold' as const, name: 'Золото', hex: '#D4AF37' },
  { id: 'silver' as const, name: 'Серебро', hex: '#C0C0C0' },
  { id: 'graphite' as const, name: 'Графит', hex: '#4A4A4A' }
];

const charms: Charm[] = [
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

function DraggableCharm({ charm, disabled }: { charm: Charm; disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: charm.id,
    disabled,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`aspect-square rounded-xl border-2 border-border overflow-hidden transition-all hover:scale-110 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img 
        src={charm.image} 
        alt={charm.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function DroppableArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: 'jewelry-canvas',
  });

  return (
    <div ref={setNodeRef} className="relative w-full h-full">
      {children}
    </div>
  );
}

const Index = () => {
  const [step, setStep] = useState(0);
  const [jewelryType, setJewelryType] = useState<JewelryType>(null);
  const [hookType, setHookType] = useState<HookType>(null);
  const [colorType, setColorType] = useState<ColorType>(null);
  const [attachedCharms, setAttachedCharms] = useState<AttachedCharm[]>([]);
  const [activeDragCharm, setActiveDragCharm] = useState<Charm | null>(null);

  const progress = (step / 4) * 100;

  const handleCategorySelect = (type: JewelryType) => {
    setJewelryType(type);
    setStep(1);
  };

  const handleHookSelect = (hook: HookType) => {
    setHookType(hook);
    setStep(2);
  };

  const handleColorSelect = (color: ColorType) => {
    setColorType(color);
    setStep(3);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const charm = charms.find(c => c.id === event.active.id);
    if (charm) {
      setActiveDragCharm(charm);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragCharm(null);
    
    const { active, over } = event;
    
    if (over && over.id === 'jewelry-canvas') {
      const charm = charms.find(c => c.id === active.id);
      if (charm) {
        const newCharm: AttachedCharm = {
          ...charm,
          id: `attached-${Date.now()}-${Math.random()}`,
          position: { x: 50, y: 60 }
        };
        setAttachedCharms(prev => [...prev, newCharm]);
      }
    }
  };

  const handleRemoveCharm = (charmId: string) => {
    setAttachedCharms(prev => prev.filter(c => c.id !== charmId));
  };

  const handleFinish = () => {
    setStep(4);
  };

  const calculatePrice = () => {
    const basePrice = hooks.find(h => h.id === hookType)?.price || 0;
    const charmsPrice = attachedCharms.reduce((sum, charm) => sum + charm.price, 0);
    return basePrice + charmsPrice;
  };

  const handleReset = () => {
    setStep(0);
    setJewelryType(null);
    setHookType(null);
    setColorType(null);
    setAttachedCharms([]);
  };

  const getColorHex = () => {
    return colors.find(c => c.id === colorType)?.hex || '#D4AF37';
  };

  const getColorFilter = () => {
    if (colorType === 'graphite') return 'grayscale(100%) brightness(0.4)';
    if (colorType === 'silver') return 'brightness(1.2) saturate(0)';
    return 'hue-rotate(0deg)';
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
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
              Выберите швензу
            </h2>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Швенза-конго 18мм диаметр
            </p>

            <div className="space-y-4">
              {hooks.map((hook) => (
                <Card
                  key={hook.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
                    hookType === hook.id ? 'border-2 border-foreground bg-accent' : 'border-border bg-card'
                  }`}
                  onClick={() => handleHookSelect(hook.id)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <img 
                          src={hook.image} 
                          alt={hook.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">{hook.name}</p>
                        <p className="text-muted-foreground text-sm">{hook.diameter}</p>
                        <p className="text-foreground text-sm font-medium">{hook.price} ₽</p>
                      </div>
                    </div>
                    {hookType === hook.id && (
                      <Icon name="Check" size={24} className="text-foreground" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {hookType && (
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
              <div className="w-48 h-48 rounded-3xl shadow-2xl overflow-hidden relative bg-secondary">
                <img 
                  src={hooks.find(h => h.id === hookType)?.image} 
                  alt="Preview"
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{ filter: getColorFilter() }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
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

            <div className="grid grid-cols-3 gap-3">
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
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-3 text-center">
                Добавьте подвески
              </h2>
              <p className="text-muted-foreground text-center mb-6 text-sm">
                Перетащите элементы на швензу
              </p>

              <Card className="mb-8 p-6 bg-gradient-to-b from-secondary to-background border-border">
                <DroppableArea>
                  <div className="w-full aspect-square max-w-[280px] mx-auto relative rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
                    <div className="absolute inset-0 flex items-start justify-center pt-4">
                      <div className="w-28 h-28 relative">
                        <img 
                          src={hooks.find(h => h.id === hookType)?.image} 
                          alt="Hook"
                          className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-500"
                          style={{ filter: getColorFilter() }}
                        />
                      </div>
                    </div>
                    
                    {attachedCharms.map((charm) => (
                      <div
                        key={charm.id}
                        className="absolute w-16 h-16 rounded-lg overflow-hidden shadow-xl border-2 border-white group cursor-pointer"
                        style={{
                          left: `${charm.position.x}%`,
                          top: `${charm.position.y}%`,
                          transform: 'translate(-50%, -50%)',
                          filter: getColorFilter()
                        }}
                        onClick={() => handleRemoveCharm(charm.id)}
                      >
                        <img 
                          src={charm.image} 
                          alt={charm.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-destructive/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Icon name="X" size={20} className="text-white" />
                        </div>
                      </div>
                    ))}

                    {attachedCharms.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground text-sm text-center px-4">
                          Перетащите подвески сюда
                        </p>
                      </div>
                    )}
                  </div>
                </DroppableArea>
              </Card>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Галерея подвесок</h3>
                  <span className="text-sm text-muted-foreground">
                    {attachedCharms.length} выбрано
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {charms.map((charm) => (
                    <DraggableCharm key={charm.id} charm={charm} />
                  ))}
                </div>
              </div>

              <Button
                className="w-full mt-6 h-14 text-lg rounded-2xl"
                onClick={handleFinish}
                disabled={attachedCharms.length === 0}
              >
                Готово
              </Button>
            </div>

            <DragOverlay>
              {activeDragCharm ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-2xl border-2 border-white opacity-80">
                  <img 
                    src={activeDragCharm.image} 
                    alt={activeDragCharm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Ваше украшение
            </h2>

            <Card className="p-8 mb-8 bg-card border-border">
              <div className="flex justify-center mb-8">
                <div className="w-64 h-64 rounded-3xl shadow-2xl overflow-hidden relative bg-gradient-to-b from-secondary to-background">
                  <div className="absolute inset-0 flex items-start justify-center pt-8">
                    <div className="w-32 h-32 relative">
                      <img 
                        src={hooks.find(h => h.id === hookType)?.image} 
                        alt="Hook preview"
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        style={{ filter: getColorFilter() }}
                      />
                    </div>
                  </div>
                  
                  {attachedCharms.map((charm, idx) => (
                    <div
                      key={charm.id}
                      className="absolute w-16 h-16 rounded-lg overflow-hidden shadow-xl border-2 border-white"
                      style={{
                        left: `${charm.position.x}%`,
                        top: `${charm.position.y + 10}%`,
                        transform: 'translate(-50%, -50%)',
                        filter: getColorFilter()
                      }}
                    >
                      <img 
                        src={charm.image} 
                        alt={charm.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
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
                  <p className="text-sm text-muted-foreground">Швенза</p>
                  <p className="font-semibold text-foreground">
                    {hooks.find(h => h.id === hookType)?.name} (18мм)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Цвет</p>
                  <p className="font-semibold text-foreground">
                    {colors.find(c => c.id === colorType)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Подвески</p>
                  <p className="font-semibold text-foreground">
                    {attachedCharms.length} шт.
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
