import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { HookType, Hook } from './types';

interface HookSelectionProps {
  hooks: Hook[];
  selectedHook: HookType;
  onSelect: (hook: HookType) => void;
  onNext: () => void;
}

const HookSelection = ({ hooks, selectedHook, onSelect, onNext }: HookSelectionProps) => {
  return (
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
              selectedHook === hook.id ? 'border-2 border-foreground bg-accent' : 'border-border bg-card'
            }`}
            onClick={() => onSelect(hook.id)}
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
              {selectedHook === hook.id && (
                <Icon name="Check" size={24} className="text-foreground" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {selectedHook && (
        <Button
          className="w-full mt-8 h-14 text-lg rounded-2xl"
          onClick={onNext}
        >
          Далее
        </Button>
      )}
    </div>
  );
};

export default HookSelection;
