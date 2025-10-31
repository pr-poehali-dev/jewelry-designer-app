import { Button } from '@/components/ui/button';
import { ColorType, HookType, Color, Hook } from './types';

interface ColorSelectionProps {
  colors: Color[];
  hooks: Hook[];
  selectedColor: ColorType;
  selectedHook: HookType;
  onSelect: (color: ColorType) => void;
  onNext: () => void;
  getColorFilter: () => string;
}

const ColorSelection = ({ 
  colors, 
  hooks, 
  selectedColor, 
  selectedHook, 
  onSelect, 
  onNext,
  getColorFilter 
}: ColorSelectionProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
        Выберите цвет
      </h2>

      <div className="mb-12 flex justify-center">
        <div className="w-48 h-48 rounded-3xl shadow-2xl overflow-hidden relative bg-secondary">
          <img 
            src={hooks.find(h => h.id === selectedHook)?.image} 
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
              selectedColor === color.id ? 'ring-4 ring-foreground ring-offset-4' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color.id)}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => (
          <p
            key={color.id}
            className={`text-center text-sm ${
              selectedColor === color.id ? 'font-semibold text-foreground' : 'text-muted-foreground'
            }`}
          >
            {color.name}
          </p>
        ))}
      </div>

      {selectedColor && (
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

export default ColorSelection;
