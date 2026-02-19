import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Truck,
      titleKey: 'home.features.freeShipping.title',
      descriptionKey: 'home.features.freeShipping.description',
    },
    {
      icon: RotateCcw,
      titleKey: 'home.features.returns.title',
      descriptionKey: 'home.features.returns.description',
    },
    {
      icon: Shield,
      titleKey: 'home.features.securePayment.title',
      descriptionKey: 'home.features.securePayment.description',
    },
    {
      icon: Headphones,
      titleKey: 'home.features.support.title',
      descriptionKey: 'home.features.support.description',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(feature.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
