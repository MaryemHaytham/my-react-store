import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
}

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: ProductFiltersProps) {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const categories = [
    { value: 'all', label: t('products.all') },
    { value: 'electronics', label: t('products.electronics') },
    { value: 'fashion', label: t('products.fashion') },
    { value: 'accessories', label: t('products.accessories') },
    { value: 'home', label: t('products.home') },
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          {t('products.category')}
          <ChevronDown className={cn('h-4 w-4 transition-transform', isCategoryOpen && 'rotate-180')} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg transition-colors text-sm',
                selectedCategory === category.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {category.label}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          {t('products.priceRange')}
          <ChevronDown className={cn('h-4 w-4 transition-transform', isPriceOpen && 'rotate-180')} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={maxPrice}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onCategoryChange('all');
                onPriceChange([0, maxPrice]);
              }}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button onClick={() => onCategoryChange('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Badge variant="secondary" className="gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <button onClick={() => onPriceChange([0, maxPrice])}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters (fixed on large screens) */}
        {/* Desktop Filters (fixed in viewport; reserves layout via spacer in Products.tsx) */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-card rounded-xl p-6 border border-border max-h-[calc(100vh-7rem)] overflow-auto">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {t('products.filter')}
            </h3>
            <FilterContent />
          </div>
        </div>

      {/* Mobile Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {t('products.filter')}
          </Button>
        </SheetTrigger>
        <SheetContent side={direction === 'rtl' ? 'right' : 'left'} className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {t('products.filter')}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ProductFilters;
