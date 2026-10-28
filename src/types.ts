export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  freeShipping?: boolean;
  tags?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  installments?: number;
  specs?: Record<string, string>;
  options?: {
    label: string;
    choices: string[];
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFlavor?: string;
  customMessage?: string;
  customAddons?: string[];
  itemPrice?: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend?: number;
}

export interface OrderDetails {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  scheduledDate?: string;
  scheduledTime?: string;
  notes?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  };
  paymentMethod: 'pix' | 'credit_card' | 'money' | 'card_on_delivery';
  changeFor?: string;
  status: 'pending' | 'approved';
}

export interface StoreConfig {
  name: string;
  slogan: string;
  phoneWhatsapp: string;
  instagram: string;
  address: string;
  openingHours: string;
  freeShippingThreshold: number;
  announcementText: string;
  pixKey: string;
}

export interface CustomCakeConfig {
  size: string;
  batter: string;
  filling: string;
  secondaryFilling?: string;
  frosting: string;
  toppings: string[];
  topperText?: string;
  themeColor: string;
  calculatedPrice: number;
}
