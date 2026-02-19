import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        products: 'Products',
        cart: 'Cart',
        wishlist: 'Wishlist',
        search: 'Search products...',
        checkout: 'Checkout',
      },
      // Hero Section
      hero: {
        title: 'Discover Premium Collection',
        subtitle: 'Experience luxury redefined with our exclusive 3D showcase',
        cta: 'Explore Now',
        secondary: 'View Collection',
      },
      // Products
      products: {
        title: 'Our Products',
        filter: 'Filter',
        sort: 'Sort by',
        price: 'Price',
        category: 'Category',
        all: 'All',
        electronics: 'Electronics',
        fashion: 'Fashion',
        accessories: 'Accessories',
        home: 'Home & Living',
        addToCart: 'Add to Cart',
        addToWishlist: 'Add to Wishlist',
        removeFromWishlist: 'Remove from Wishlist',
        inCart: 'In Cart',
        viewDetails: 'View Details',
        quickView: 'Quick View',
        priceRange: 'Price Range',
        noProducts: 'No products found',
        showing: 'Showing',
        of: 'of',
        products: 'products',
      },
      
      // Cart
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        emptyMessage: 'Add some products to get started',
        continueShopping: 'Continue Shopping',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tax: 'Tax',
        total: 'Total',
        checkout: 'Proceed to Checkout',
        remove: 'Remove',
        quantity: 'Qty',
        free: 'Free',
        items: 'items',
        added: 'Added to cart',
      },
      // Wishlist
      wishlist: {
        title: 'My Wishlist',
        empty: 'Your wishlist is empty',
        emptyMessage: 'Save your favorite items here',
        browse: 'Browse Products',
        moveToCart: 'Move to Cart',
        added: 'Added to wishlist',
        removed: 'Removed from wishlist',
      },
      // Checkout
      checkout: {
        title: 'Checkout',
        shipping: 'Shipping Information',
        payment: 'Payment Method',
        review: 'Review Order',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        city: 'City',
        country: 'Country',
        zipCode: 'ZIP Code',
        cardNumber: 'Card Number',
        expiry: 'Expiry Date',
        cvv: 'CVV',
        placeOrder: 'Place Order',
        orderSuccess: 'Order Placed Successfully!',
        orderMessage: 'Thank you for your order. You will receive a confirmation email shortly.',
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        language: 'Language',
        theme: 'Theme',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
      },
      // Footer
      footer: {
        about: 'About Us',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        newsletter: 'Subscribe to our newsletter',
        emailPlaceholder: 'Enter your email',
        subscribe: 'Subscribe',
        shopHeading: 'Shop',
        companyHeading: 'Company',
        rights: 'All rights reserved.',
      },
      // Home / Landing
      home: {
        shopBy: 'Shop by',
        categoriesSubtitle: "Find exactly what you're looking for",
        shopNow: 'Shop Now',
        featuredTitle: 'Featured Products',
        featuredSubtitle: 'Handpicked items just for you',
        viewAll: 'View All',
        viewAllProducts: 'View All Products',
        stats: {
          products: 'Products',
          customers: 'Customers',
          rating: 'Rating',
        },
        features: {
          freeShipping: {
            title: 'Free Shipping',
            description: 'Free shipping on orders over $100',
          },
          returns: {
            title: '30-Day Returns',
            description: 'Easy returns within 30 days',
          },
          securePayment: {
            title: 'Secure Payment',
            description: '100% secure payment methods',
          },
          support: {
            title: '24/7 Support',
            description: 'Dedicated customer support',
          },
        },
      },
      // Product Detail
      productDetail: {
        productNotFound: 'Product not found',
        backToProducts: 'Back to Products',
        new: 'NEW',
        description: 'Description',
        specifications: 'Specifications',
        reviews: 'Reviews',
        reviewsComingSoon: 'Customer reviews coming soon...',
        relatedProducts: 'Related Products',
        quantity: 'Quantity',
        color: 'Color',
        size: 'Size',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        freeShipping: 'Free Shipping',
        returns: '30-Day Returns',
        warranty: '2-Year Warranty',
        category: 'Category',
        rating: 'Rating',
        availability: 'Availability',
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        home: 'الرئيسية',
        products: 'المنتجات',
        cart: 'السلة',
        wishlist: 'المفضلة',
        search: 'البحث عن منتجات...',
        checkout: 'الدفع',
      },
      // Hero Section
      hero: {
        title: 'اكتشف المجموعة المميزة',
        subtitle: 'استمتع بتجربة الفخامة مع عرضنا ثلاثي الأبعاد الحصري',
        cta: 'استكشف الآن',
        secondary: 'عرض المجموعة',
      },
      // Products
      products: {
        title: 'منتجاتنا',
        filter: 'تصفية',
        sort: 'ترتيب حسب',
        price: 'السعر',
        category: 'الفئة',
        all: 'الكل',
        electronics: 'إلكترونيات',
        fashion: 'أزياء',
        accessories: 'إكسسوارات',
        home: 'المنزل والمعيشة',
        addToCart: 'أضف للسلة',
        addToWishlist: 'أضف للمفضلة',
        removeFromWishlist: 'إزالة من المفضلة',
        inCart: 'في السلة',
        viewDetails: 'عرض التفاصيل',
        quickView: 'عرض سريع',
        priceRange: 'نطاق السعر',
        noProducts: 'لا توجد منتجات',
        showing: 'عرض',
        of: 'من',
        products: 'منتجات',
      },
      // Product Details
      
      // Cart
      cart: {
        title: 'سلة التسوق',
        empty: 'سلتك فارغة',
        emptyMessage: 'أضف بعض المنتجات للبدء',
        continueShopping: 'متابعة التسوق',
        subtotal: 'المجموع الفرعي',
        shipping: 'الشحن',
        tax: 'الضريبة',
        total: 'الإجمالي',
        checkout: 'إتمام الشراء',
        remove: 'إزالة',
        quantity: 'الكمية',
        free: 'مجاني',
        items: 'عناصر',
      },
      // Wishlist
      wishlist: {
        title: 'قائمة المفضلة',
        empty: 'قائمة المفضلة فارغة',
        emptyMessage: 'احفظ منتجاتك المفضلة هنا',
        browse: 'تصفح المنتجات',
        moveToCart: 'نقل إلى السلة',
      },
      // Checkout
      checkout: {
        title: 'إتمام الطلب',
        shipping: 'معلومات الشحن',
        payment: 'طريقة الدفع',
        review: 'مراجعة الطلب',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        country: 'البلد',
        zipCode: 'الرمز البريدي',
        cardNumber: 'رقم البطاقة',
        expiry: 'تاريخ الانتهاء',
        cvv: 'رمز CVV',
        placeOrder: 'تأكيد الطلب',
        orderSuccess: 'تم الطلب بنجاح!',
        orderMessage: 'شكراً لطلبك. ستصلك رسالة تأكيد على بريدك الإلكتروني قريباً.',
      },
      // Common
      common: {
        loading: 'جاري التحميل...',
        error: 'حدث خطأ ما',
        retry: 'حاول مجدداً',
        close: 'إغلاق',
        save: 'حفظ',
        cancel: 'إلغاء',
        confirm: 'تأكيد',
        back: 'رجوع',
        next: 'التالي',
        language: 'اللغة',
        theme: 'المظهر',
        lightMode: 'الوضع الفاتح',
        darkMode: 'الوضع الداكن',
      },
      // Footer
      footer: {
        about: 'من نحن',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        newsletter: 'اشترك في نشرتنا البريدية',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        subscribe: 'اشترك',
        shopHeading: 'تسوق',
        companyHeading: 'الشركة',
        rights: 'جميع الحقوق محفوظة.',
      },
      // Home / Landing
      home: {
        shopBy: 'تسوق حسب',
        categoriesSubtitle: 'ابحث عما تريده بالضبط',
        shopNow: 'تسوق الآن',
        featuredTitle: 'المنتجات المميزة',
        featuredSubtitle: 'مختارة بعناية من أجلك',
        viewAll: 'عرض الكل',
        viewAllProducts: 'عرض جميع المنتجات',
        stats: {
          products: 'منتجات',
          customers: 'عملاء',
          rating: 'تقييم',
        },
        features: {
          freeShipping: {
            title: 'شحن مجاني',
            description: 'شحن مجاني للطلبات فوق 100 دولار',
          },
          returns: {
            title: 'إرجاع خلال 30 يوم',
            description: 'إرجاع سهل خلال 30 يومًا',
          },
          securePayment: {
            title: 'دفع آمن',
            description: 'طرق دفع آمنة 100%',
          },
          support: {
            title: 'دعم على مدار الساعة',
            description: 'دعم مخصص للعملاء',
          },
        },
      },
      // Product Detail
      productDetail: {
        productNotFound: 'المنتج غير موجود',
        backToProducts: 'العودة إلى المنتجات',
        new: 'جديد',
        description: 'الوصف',
        specifications: 'المواصفات',
        reviews: 'التقييمات',
        reviewsComingSoon: 'تقييمات العملاء قريبا...',
        relatedProducts: 'منتجات ذات صلة',
        quantity: 'الكمية',
        color: 'اللون',
        size: 'المقاس',
        inStock: 'متوفر',
        outOfStock: 'غير متوفر',
        freeShipping: 'شحن مجاني',
        returns: 'إرجاع خلال 30 يوم',
        warranty: 'ضمان سنتين',
        category: 'الفئة',
        rating: 'التقييم',
        availability: 'التوفر',
      },
    },
  },
};

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
