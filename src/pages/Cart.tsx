import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function Cart() {
  const { t } = useTranslation();
  const {  direction } = useLanguage();
  const { state, removeItem, updateQuantity} = useCart();

  const subtotal = state.total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('cart.empty')}</h1>
            <p className="text-muted-foreground mb-8">{t('cart.emptyMessage')}</p>
            <Link to="/products">
              <Button size="lg">
                {t('cart.continueShopping')}
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
            <ShoppingCart className="h-8 w-8" />
            {t('cart.title')}
          </h1>
          <p className="text-muted-foreground">
            {state.items.length} {t('cart.items')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {state.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <Link to={`/products/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </Link>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <Link to={`/products/${item.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="font-bold shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    {item.color && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">Color:</span>
                        <span
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    )}
                    
                    {item.size && (
                      <span className="text-sm text-muted-foreground mt-1">
                        Size: {item.size}
                      </span>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t('cart.remove')}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('cart.shipping')}</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">{t('cart.free')}</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('cart.tax')}</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg">
                  <span className="font-bold">{t('cart.total')}</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <p className="text-sm text-green-600 mt-4 text-center">
                  🎉 You've qualified for free shipping!
                </p>
              )}

              <Link to="/checkout" className="block mt-6">
                <Button size="lg" className="w-full h-14 text-lg">
                  {t('cart.checkout')}
                  <ArrowRight className={cn('ml-2 h-5 w-5', direction === 'rtl' && 'rotate-180')} />
                </Button>
              </Link>

              <Link to="/products">
                <Button variant="ghost" className="w-full mt-3">
                  {t('cart.continueShopping')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
