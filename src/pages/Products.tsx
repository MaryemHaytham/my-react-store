import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Grid, LayoutGrid, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { products, Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function ProductsPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  const maxPrice = Math.max(...products.map((p) => p.price));

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameAr.includes(searchQuery) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter((p) => p.new).concat(result.filter((p) => !p.new));
        break;
      case 'featured':
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t('products.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('products.showing')} {filteredProducts.length} {t('products.of')} {products.length} {t('products.products')}
          </p>
        </motion.div>

        {/* Search and Sort Bar aligned with product column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-8">
            {/* spacer for desktop sidebar */}
            <div className="hidden lg:block w-64 shrink-0" />

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-card w-full"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </form>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-40 bg-card">
                    <SelectValue placeholder={t('products.sort')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={gridCols === 2 ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setGridCols(2)}
                    className="h-8 w-8"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridCols === 3 ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setGridCols(3)}
                    className="h-8 w-8"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Products Grid */}
          <div className="flex gap-8">
          {/* Desktop Filters are rendered next to the product column */}
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            maxPrice={maxPrice}
          />

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-xl font-medium mb-2">{t('products.noProducts')}</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, maxPrice]);
                    searchParams.delete('search');
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Desktop Filters: rendered by ProductFilters in the header (it will show fixed sidebar on lg) */}
      </div>
    </Layout>
  );
}
