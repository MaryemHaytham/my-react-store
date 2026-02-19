import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  CheckCircle2,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type Step = 'shipping' | 'payment' | 'review';

export default function Checkout() {
  const { t } = useTranslation();
  const { language, direction } = useLanguage();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card',
  });

  const subtotal = state.total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'shipping', label: t('checkout.shipping'), icon: <Truck className="h-5 w-5" /> },
    { id: 'payment', label: t('checkout.payment'), icon: <CreditCard className="h-5 w-5" /> },
    { id: 'review', label: t('checkout.review'), icon: <CheckCircle2 className="h-5 w-5" /> },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('review');
  };

  const handleBack = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'review') setCurrentStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsComplete(true);
    clearCart();
  };

  if (state.items.length === 0 && !isComplete) {
    navigate('/cart');
    return null;
  }

  if (isComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">{t('checkout.orderSuccess')}</h1>
            <p className="text-muted-foreground mb-8">{t('checkout.orderMessage')}</p>
            <Link to="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 pl-0 hover:pl-2 transition-all mb-4"
          >
            <ChevronLeft className={cn('h-4 w-4', direction === 'rtl' && 'rotate-180')} />
            {t('common.back')}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{t('checkout.title')}</h1>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors',
                    currentStep === step.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted bg-muted text-muted-foreground'
                  )}
                >
                  {step.icon}
                </div>
                <span
                  className={cn(
                    'hidden md:block ml-3 text-sm font-medium',
                    currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 md:w-24 h-0.5 mx-2 md:mx-4',
                      steps.findIndex((s) => s.id === currentStep) > index
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl border border-border p-6 space-y-6"
                >
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {t('checkout.shipping')}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('checkout.firstName')}</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('checkout.lastName')}</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('checkout.email')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('checkout.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('checkout.address')}</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, Apt 4"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t('checkout.city')}</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{t('checkout.country')}</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">{t('checkout.zipCode')}</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleNext} size="lg" className="w-full">
                    {t('common.next')}
                  </Button>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl border border-border p-6 space-y-6"
                >
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t('checkout.payment')}
                  </h2>
                  
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, paymentMethod: value }))
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        Credit / Debit Card
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">{t('checkout.cardNumber')}</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">{t('checkout.expiry')}</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">{t('checkout.cvv')}</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Your payment information is secure and encrypted
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} size="lg" className="flex-1">
                      {t('common.back')}
                    </Button>
                    <Button onClick={handleNext} size="lg" className="flex-1">
                      {t('common.next')}
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-card rounded-xl border border-border p-6 space-y-6"
                >
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    {t('checkout.review')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">{t('checkout.shipping')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.zipCode}<br />
                        {formData.country}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">{t('checkout.payment')}</h3>
                      <p className="text-sm text-muted-foreground">
                        Card ending in {formData.cardNumber.slice(-4) || '••••'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} size="lg" className="flex-1">
                      {t('common.back')}
                    </Button>
                    <Button onClick={handlePlaceOrder} size="lg" className="flex-1 gap-2">
                      <ShieldCheck className="h-5 w-5" />
                      {t('checkout.placeOrder')}
                    </Button>
                  </div>
                </motion.div>
              )}
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
              
              <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.shipping')}</span>
                  <span>{shipping === 0 ? t('cart.free') : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('cart.tax')}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('cart.total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
