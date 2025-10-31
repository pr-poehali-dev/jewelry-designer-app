import { Card } from '@/components/ui/card';
import { JewelryType, Category } from './types';

interface CategorySelectionProps {
  categories: Category[];
  onSelect: (type: JewelryType) => void;
}

const CategorySelection = ({ categories, onSelect }: CategorySelectionProps) => {
  return (
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
            onClick={() => onSelect(category.id)}
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
  );
};

export default CategorySelection;
