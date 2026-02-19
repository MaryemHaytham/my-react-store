export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  originalPrice?: number;
  category: 'electronics' | 'fashion' | 'accessories' | 'home';
  image: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  featured?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    nameAr: 'سماعات لاسلكية فاخرة',
    description: 'Experience exceptional sound quality with active noise cancellation and 30-hour battery life. Perfect for audiophiles who demand the best.',
    descriptionAr: 'استمتع بجودة صوت استثنائية مع إلغاء الضوضاء النشط وعمر بطارية 30 ساعة. مثالية لعشاق الموسيقى الذين يطلبون الأفضل.',
    price: 349.99,
    originalPrice: 449.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#f5f5f5', '#c9a962'],
    inStock: true,
    rating: 4.8,
    reviews: 1243,
    featured: true,
    new: true,
  },
  {
    id: '2',
    name: 'Designer Leather Watch',
    nameAr: 'ساعة جلدية أنيقة',
    description: 'Timeless elegance meets modern craftsmanship. Swiss movement with genuine leather strap.',
    descriptionAr: 'أناقة خالدة تلتقي بالحرفية الحديثة. حركة سويسرية مع سوار جلد أصلي.',
    price: 299.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    ],
    colors: ['#2c1810', '#1a1a1a', '#c9a962'],
    inStock: true,
    rating: 4.9,
    reviews: 856,
    featured: true,
  },
  {
    id: '3',
    name: 'Smart Home Speaker',
    nameAr: 'مكبر صوت منزلي ذكي',
    description: 'Voice-controlled smart speaker with premium audio and smart home integration.',
    descriptionAr: 'مكبر صوت ذكي يتحكم بالصوت مع صوت فاخر وتكامل المنزل الذكي.',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#f5f5f5'],
    inStock: true,
    rating: 4.6,
    reviews: 432,
  },
  {
    id: '4',
    name: 'Premium Leather Backpack',
    nameAr: 'حقيبة ظهر جلدية فاخرة',
    description: 'Handcrafted Italian leather backpack with laptop compartment and premium hardware.',
    descriptionAr: 'حقيبة ظهر من الجلد الإيطالي المصنوعة يدوياً مع حجرة للحاسوب المحمول.',
    price: 449.99,
    originalPrice: 549.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    colors: ['#2c1810', '#1a1a1a', '#8b4513'],
    inStock: true,
    rating: 4.7,
    reviews: 324,
    featured: true,
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    nameAr: 'مصباح مكتب بسيط',
    description: 'Adjustable LED desk lamp with wireless charging base and touch controls.',
    descriptionAr: 'مصباح مكتب LED قابل للتعديل مع قاعدة شحن لاسلكي وتحكم باللمس.',
    price: 129.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#f5f5f5', '#c9a962'],
    inStock: true,
    rating: 4.5,
    reviews: 198,
    new: true,
  },
  {
    id: '6',
    name: 'Cashmere Blend Sweater',
    nameAr: 'سترة كشمير فاخرة',
    description: 'Luxuriously soft cashmere blend sweater, perfect for any occasion.',
    descriptionAr: 'سترة ناعمة فاخرة من مزيج الكشمير، مثالية لأي مناسبة.',
    price: 189.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    ],
    colors: ['#f5f5dc', '#1a1a1a', '#8b7355'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.8,
    reviews: 567,
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    nameAr: 'قاعدة شحن لاسلكية',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    descriptionAr: 'قاعدة شحن لاسلكي سريعة متوافقة مع جميع الأجهزة المدعومة.',
    price: 49.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#f5f5f5'],
    inStock: true,
    rating: 4.4,
    reviews: 876,
  },
  {
    id: '8',
    name: 'Artisan Coffee Table',
    nameAr: 'طاولة قهوة حرفية',
    description: 'Handcrafted solid wood coffee table with minimalist Scandinavian design.',
    descriptionAr: 'طاولة قهوة مصنوعة يدوياً من الخشب الصلب بتصميم إسكندنافي بسيط.',
    price: 599.99,
    originalPrice: 799.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    ],
    colors: ['#8b4513', '#deb887'],
    inStock: true,
    rating: 4.9,
    reviews: 234,
    featured: true,
  },
  {
    id: '9',
    name: 'Premium Sunglasses',
    nameAr: 'نظارات شمسية فاخرة',
    description: 'Polarized lenses with titanium frame, UV400 protection.',
    descriptionAr: 'عدسات مستقطبة مع إطار تيتانيوم، حماية UV400.',
    price: 249.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#c9a962', '#8b4513'],
    inStock: true,
    rating: 4.6,
    reviews: 432,
    new: true,
  },
  {
    id: '10',
    name: 'Ceramic Vase Set',
    nameAr: 'طقم مزهريات سيراميك',
    description: 'Set of 3 handmade ceramic vases in earth tones.',
    descriptionAr: 'طقم من 3 مزهريات سيراميك مصنوعة يدوياً بألوان ترابية.',
    price: 89.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    ],
    colors: ['#deb887', '#8b7355', '#f5f5dc'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '11',
    name: 'Mechanical Keyboard',
    nameAr: 'لوحة مفاتيح ميكانيكية',
    description: 'Premium mechanical keyboard with RGB backlighting and hot-swappable switches.',
    descriptionAr: 'لوحة مفاتيح ميكانيكية فاخرة مع إضاءة RGB ومفاتيح قابلة للتبديل.',
    price: 179.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
    ],
    colors: ['#1a1a1a', '#f5f5f5'],
    inStock: true,
    rating: 4.8,
    reviews: 789,
  },
  {
    id: '12',
    name: 'Silk Scarf',
    nameAr: 'وشاح حرير',
    description: 'Pure silk scarf with hand-rolled edges and exclusive print.',
    descriptionAr: 'وشاح حرير خالص مع حواف ملفوفة يدوياً وطباعة حصرية.',
    price: 159.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    colors: ['#c9a962', '#1a1a1a', '#8b0000'],
    inStock: true,
    rating: 4.9,
    reviews: 234,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.new);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameAr.includes(query) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.descriptionAr.includes(query)
  );
};
