import React, { useState, useMemo } from 'react';
import { 
  INITIAL_PRODUCTS, 
  CONFEITARIA_CATEGORIES, 
  AVAILABLE_COUPONS 
} from './data/mockProducts';
import { 
  Product, 
  CartItem, 
  Coupon, 
  OrderDetails, 
  StoreConfig 
} from './types';
import { ConfeitariaHeader } from './components/ConfeitariaHeader';
import { ConfeitariaHome } from './components/ConfeitariaHome';
import { OrderingMenu } from './components/OrderingMenu';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { ConfeitariaAbout } from './components/ConfeitariaAbout';
import { ConfeitariaProductModal } from './components/ConfeitariaProductModal';
import { ConfeitariaCartDrawer } from './components/ConfeitariaCartDrawer';
import { ConfeitariaCheckoutModal } from './components/ConfeitariaCheckoutModal';
import { ConfeitariaOrderSuccessModal } from './components/ConfeitariaOrderSuccessModal';
import { ConfeitariaAdminModal } from './components/ConfeitariaAdminModal';
import { ConfeitariaFooter } from './components/ConfeitariaFooter';

export default function App() {
  // Store Config for Doce Ateliê
  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    name: 'Doce Ateliê',
    slogan: 'Confeitaria Artesanal • Bolos, Doces Finos & Momentos Inesquecíveis',
    phoneWhatsapp: '+55 21 97966-9281',
    instagram: '@doceatelie.confeitaria',
    address: 'Rua das Camélias, 142 - Jardins, São Paulo - SP',
    openingHours: 'Seg a Sáb: 08:30 às 19:30 | Dom: 09:00 às 15:00',
    freeShippingThreshold: 90.00,
    announcementText: '✨ Ganhe 10% OFF no primeiro pedido com o cupom DOCE10 • Bolos a pronta entrega!',
    pixKey: 'pix@doceatelie.com.br'
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'custom-cake' | 'about'>('home');

  // Products state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [favorites, setFavorites] = useState<string[]>(['doce-1', 'doce-3']);

  // Cart State (Initialized with a delicious Red Velvet slice & brigadeiros)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedSize: 'Bolo Médio (1.8 kg)',
      itemPrice: 95.00
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Delivery & Scheduling for Checkout
  const [checkoutDeliveryType, setCheckoutDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [checkoutScheduledDate, setCheckoutScheduledDate] = useState('Hoje');
  const [checkoutScheduledTime, setCheckoutScheduledTime] = useState('O mais rápido (60-90 min)');
  const [checkoutNotes, setCheckoutNotes] = useState('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Menu Search & Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Categories list
  const categoriesList = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category)));
    return ['Todos', ...unique];
  }, [products]);

  // Cart count
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Toggle Favorite
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Add Product to Cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && !item.customAddons && !item.customMessage
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev, 
          { 
            product, 
            quantity: 1, 
            selectedSize: product.sizes?.[0] || 'Padrão',
            itemPrice: product.price 
          }
        ];
      }
    });
  };

  // Add Detailed Item to Cart (from Modal or Custom Cake)
  const handleAddDetailedItemToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  // Remove Cart Item
  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Coupon application
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS.find(c => c.code === clean);
    
    if (!coupon) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }

    const currentSubtotal = cartItems.reduce((acc, i) => acc + (i.itemPrice || i.product.price) * i.quantity, 0);
    if (coupon.minSpend && currentSubtotal < coupon.minSpend) {
      return { 
        success: false, 
        message: `Este cupom requer pedido mínimo de R$ ${coupon.minSpend.toFixed(2).replace('.', ',')}.` 
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Cupom ${coupon.code} aplicado com sucesso (-${coupon.discountPercent}%)!` };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Open Checkout with drawer info
  const handleProceedToCheckout = (
    deliveryType: 'delivery' | 'pickup',
    scheduledDate: string,
    scheduledTime: string,
    notes: string
  ) => {
    setCheckoutDeliveryType(deliveryType);
    setCheckoutScheduledDate(scheduledDate);
    setCheckoutScheduledTime(scheduledTime);
    setCheckoutNotes(notes);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Add Product from Admin
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  // Delete Product from Admin
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCartItems(prev => prev.filter(i => i.product.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-stone-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-950">
      
      {/* Confectionery Header */}
      <ConfeitariaHeader
        storeConfig={storeConfig}
        cartCount={cartCount}
        favoritesCount={favorites.length}
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => {
          setActiveTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: Tela Inicial (Design da Imagem 1) */}
        {activeTab === 'home' && (
          <ConfeitariaHome
            storeConfig={storeConfig}
            featuredProducts={products}
            onOpenMenu={(cat) => {
              if (cat) setSelectedCategory(cat);
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomCake={() => {
              setActiveTab('custom-cake');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            isFavorite={(id) => favorites.includes(id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* TAB 2: Tela onde os clientes fazem os pedidos / Cardápio Digital (Design da Imagem 2) */}
        {activeTab === 'menu' && (
          <OrderingMenu
            products={products}
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            isFavorite={(id) => favorites.includes(id)}
            onToggleFavorite={handleToggleFavorite}
            cartItems={cartItems}
            onOpenCart={() => setIsCartOpen(true)}
            storeConfig={storeConfig}
          />
        )}

        {/* TAB 3: Monte seu Bolo Personalizado */}
        {activeTab === 'custom-cake' && (
          <CustomCakeBuilder
            onAddCustomCakeToCart={(item) => {
              handleAddDetailedItemToCart(item);
              setIsCartOpen(true);
            }}
            onBackToMenu={() => setActiveTab('menu')}
          />
        )}

        {/* TAB 4: Sobre o Ateliê, Retirada & Horários */}
        {activeTab === 'about' && (
          <ConfeitariaAbout
            storeConfig={storeConfig}
            onOpenMenu={() => setActiveTab('menu')}
            onOpenCustomCake={() => setActiveTab('custom-cake')}
          />
        )}

      </main>

      {/* Confectionery Footer */}
      <ConfeitariaFooter
        storeConfig={storeConfig}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Product Detail & Customization Modal */}
      <ConfeitariaProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isFavorite={quickViewProduct ? favorites.includes(quickViewProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddDetailedItemToCart}
      />

      {/* Cart Drawer & Comanda */}
      <ConfeitariaCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onProceedToCheckout={handleProceedToCheckout}
        storeConfig={storeConfig}
      />

      {/* Checkout Modal */}
      <ConfeitariaCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        deliveryType={checkoutDeliveryType}
        scheduledDate={checkoutScheduledDate}
        scheduledTime={checkoutScheduledTime}
        orderNotes={checkoutNotes}
        storeConfig={storeConfig}
        onOrderComplete={(order) => {
          setIsCheckoutOpen(false);
          setCartItems([]);
          setAppliedCoupon(null);
          setCompletedOrder(order);
        }}
      />

      {/* Order Success Celebration Modal */}
      <ConfeitariaOrderSuccessModal
        order={completedOrder}
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
        storeConfig={storeConfig}
      />

      {/* Bakery Owner Admin & Product Creator Modal */}
      <ConfeitariaAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        storeConfig={storeConfig}
        onUpdateStoreConfig={setStoreConfig}
        categories={categoriesList}
      />

    </div>
  );
}
