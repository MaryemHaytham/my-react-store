// removed unused imports (useTranslation, motion) to fix build warnings
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <FeaturesSection />
    </Layout>
  );
};

export default Index;
