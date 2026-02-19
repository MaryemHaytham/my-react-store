import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { direction } = useLanguage();

  return (
    <div dir={direction} className="min-h-screen flex flex-col transition-theme">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pt-16 md:pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export default Layout;
