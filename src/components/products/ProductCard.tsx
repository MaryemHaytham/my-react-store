import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const name = language === 'ar' ? product.nameAr : product.name;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    
    toast.success(language === 'ar' ? 'تمت الإضافة للسلة' : 'Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWishlist({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    toast.success(
      inWishlist 
        ? (language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist')
        : (language === 'ar' ? 'تمت الإضافة للمفضلة' : 'Added to wishlist')
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="product-card group overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.new && (
                <Badge className="bg-primary text-primary-foreground">
                  {language === 'ar' ? 'جديد' : 'NEW'}
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  inWishlist 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground'
                )}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </motion.button>
            </div>

            {/* Add to Cart Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button
                onClick={handleAddToCart}
                disabled={inCart}
                className="w-full"
                variant={inCart ? 'secondary' : 'default'}
              >
                {inCart ? (
                  t('products.inCart')
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t('products.addToCart')}
                  </>
                )}
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < Math.floor(product.rating)
                        ? 'text-primary fill-primary'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Title */}
            <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
