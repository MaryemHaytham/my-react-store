import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t('footer.about'), path: '/' },
      { label: t('footer.contact'), path: '/' },
    ],
    legal: [
      { label: t('footer.privacy'), path: '/' },
      { label: t('footer.terms'), path: '/' },
    ],
    shop: [
      { label: t('nav.products'), path: '/products' },
      { label: t('nav.cart'), path: '/cart' },
      { label: t('nav.wishlist'), path: '/wishlist' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-bold text-2xl">
                {(() => {
                  const brand = t('brand.full');
                  const parts = brand ? brand.split(' ') : ['MY', 'STORE'];
                  if (parts.length > 1) {
                    return (
                      <>
                        <span className="text-gradient">{parts.slice(0, 1).join(' ')}</span>
                        <span className="text-foreground">{parts.slice(1).join(' ')}</span>
                      </>
                    );
                  }
                  return <span className="text-gradient">{brand}</span>;
                })()}
              </span>
            </Link>
            
            <p className="text-muted-foreground max-w-md">
              {t('footer.newsletter')}
            </p>
            
            <form className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="bg-secondary/50 border-transparent focus:border-primary"
              />
              <Button type="submit" className="shrink-0">
                {t('footer.subscribe')}
              </Button>
            </form>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.shopHeading')}</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.companyHeading')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="MY-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} MY STORE. {t('footer.rights')}</p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            support@MYstore.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
