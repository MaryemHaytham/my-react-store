import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Wishlist() {
  const { t } = useTranslation();
  const { language, direction } = useLanguage();
  const { state, removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();

  const handleMoveToCart = (item: typeof state.items[0]) => {
    if (!isInCart(item.id)) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      removeItem(item.id);
      toast.success(language === 'ar' ? 'تم النقل إلى السلة' : 'Moved to cart');
    }
  };

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('wishlist.empty')}</h1>
            <p className="text-muted-foreground mb-8">{t('wishlist.emptyMessage')}</p>
            <Link to="/products">
              <Button size="lg">
                {t('wishlist.browse')}
                <ArrowRight className={cn('ml-2 h-4 w-4', direction === 'rtl' && 'rotate-180')} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            {t('wishlist.title')}
          </h1>
          <p className="text-muted-foreground">
            {state.items.length} {language === 'ar' ? 'عناصر' : 'items'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {state.items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl border border-border overflow-hidden group"
              >
                <Link to={`/products/${item.id}`}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMoveToCart(item)}
                      disabled={isInCart(item.id)}
                    >
                      {isInCart(item.id) ? (
                        t('products.inCart')
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {t('wishlist.moveToCart')}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        removeItem(item.id);
                        toast.success(language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
