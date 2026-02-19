import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

export function FeaturedProducts() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t('home.featuredTitle')}
            </h2>
            <p className="text-muted-foreground">{t('home.featuredSubtitle')}</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="group hidden sm:flex">
              {t('home.viewAll')}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:${direction === 'rtl' ? '-' : ''}translate-x-1`} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link to="/products" className="sm:hidden">
          <Button variant="outline" className="w-full mt-8">
            {t('home.viewAllProducts')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
