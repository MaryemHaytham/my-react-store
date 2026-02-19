import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CategoriesSection() {
  const { t } = useTranslation();
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      nameAr: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
      count: 45,
    },
    {
      id: 'fashion',
      name: 'Fashion',
      nameAr: 'أزياء',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      count: 120,
    },
    {
      id: 'accessories',
      name: 'Accessories',
      nameAr: 'إكسسوارات',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      count: 85,
    },
    {
      id: 'home',
      name: 'Home & Living',
      nameAr: 'المنزل والمعيشة',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      count: 65,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t('home.shopBy')} <span className="text-gradient">{t('products.category')}</span>
          </h2>
          <p className="text-muted-foreground">{t('home.categoriesSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/products?category=${category.id}`}>
                <div className="group relative aspect-[4/5] rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {t(`products.${category.id}`)}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {category.count} {t('products.products')}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {t('home.shopNow')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
