import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  ChevronLeft,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Layout } from '@/components/layout/Layout';
import { ProductViewer3D } from '@/components/3d/ProductViewer3D';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language, direction } = useLanguage();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const product = getProductById(id || '');
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '#c9a962');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('productDetail.productNotFound')}</h1>
          <Link to="/products">
            <Button>{t('productDetail.backToProducts')}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const name = language === 'ar' ? product.nameAr : product.name;
  const description = language === 'ar' ? product.descriptionAr : product.description;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    toast.success(t('cart.added'));
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(inWishlist ? t('wishlist.removed') : t('wishlist.added'));
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 pl-0 hover:pl-2 transition-all"
          >
            <ChevronLeft className={cn('h-4 w-4', direction === 'rtl' && 'rotate-180')} />
            {t('common.back')}
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images / 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main viewer: show product image if available, otherwise 3D viewer */}
            {product.images && product.images.length > 0 ? (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gradient-to-b from-muted/50 to-muted flex items-center justify-center">
                <img
                  src={product.images[selectedImage]}
                  alt={`${name} view ${selectedImage + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <ProductViewer3D selectedColor={selectedColor} />
            )}
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors',
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <img
                    src={image}
                    alt={`${name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Badges */}
            <div className="flex items-center gap-2">
              {product.new && (
                <Badge className="bg-primary text-primary-foreground">{t('productDetail.new')}</Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < Math.floor(product.rating)
                        ? 'text-primary fill-primary'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} {t('productDetail.reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Separator />

            {/* Colors */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('productDetail.color')}</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-transform hover:scale-110',
                      selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-border'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="space-y-3">
                <label className="text-sm font-medium">{t('productDetail.size')}</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('productDetail.quantity')}</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className={cn(
                  'text-sm',
                  product.inStock ? 'text-green-600' : 'text-destructive'
                )}>
                  {product.inStock ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      {t('productDetail.inStock')}
                    </span>
                  ) : (
                    t('productDetail.outOfStock')
                  )}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {inCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t('products.inCart')}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {t('products.addToCart')}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current text-red-500')} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { icon: Truck, label: t('productDetail.freeShipping') },
                { icon: RotateCcw, label: t('productDetail.returns') },
                { icon: Shield, label: t('productDetail.warranty') },
              ].map((feature) => (
                <div key={feature.label} className="text-center p-4 bg-muted rounded-lg">
                  <feature.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">{t('productDetail.relatedProducts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </Layout>
  );
}
