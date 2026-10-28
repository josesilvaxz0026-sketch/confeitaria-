import React, { useState, useMemo } from 'react';
import { 
  CakeSlice, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  Star, 
  ShoppingBag, 
  Heart, 
  Plus, 
  Check, 
  Eye, 
  Filter, 
  Clock, 
  ArrowUpDown,
  X,
  Cake,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { Product, CartItem, StoreConfig } from '../types';

interface OrderingMenuProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  storeConfig: StoreConfig;
}

export type SortType = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const OrderingMenu: React.FC<OrderingMenuProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onAddToCart,
  onQuickView,
  isFavorite,
  onToggleFavorite,
  cartItems,
  onOpenCart,
  storeConfig,
}) => {
  const [filterBadge, setFilterBadge] = useState<'all' | 'ready' | 'featured' | 'free-shipping'>('all');
  const [sortBy, setSortBy] = useState<SortType>('popular');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'Todos' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchTag = product.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchTag) return false;
      }
      // Badge filters
      if (filterBadge === 'ready' && !product.tags?.some(t => t.toLowerCase().includes('pronta') || t.toLowerCase().includes('caseirinho') || t.toLowerCase().includes('individual'))) {
        // loosely ready-to-deliver
        return product.category !== 'Kits Festa & Presentes';
      }
      if (filterBadge === 'featured' && !product.isFeatured) {
        return false;
      }
      if (filterBadge === 'free-shipping' && !product.freeShipping) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first then rating
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  }, [products, selectedCategory, searchQuery, filterBadge, sortBy]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Bolos & Tortas':
        return '🎂';
      case 'Doces Gourmet':
        return '🍫';
      case 'Copos da Felicidade':
        return '🍨';
      case 'Salgados & Quiches':
        return '🥐';
      case 'Cafés & Bebidas':
        return '☕';
      case 'Kits Festa & Presentes':
        return '🎁';
      default:
        return '✨';
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-fadeIn">
      {/* Ordering Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 rounded-3xl text-white p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/30 text-rose-200 border border-rose-400/30 px-3 py-1 rounded-full text-xs font-semibold">
            <CakeSlice className="w-3.5 h-3.5 text-amber-300" />
            Cardápio Online & Sistema de Pedidos
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Faça seu Pedido no Doce Ateliê
          </h1>
          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
            Escolha seus doces favoritos, personalize opções e receba fresquinho na sua casa ou retire em nossa loja.
          </p>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-rose-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-rose-50 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-rose-600" />
            <span>Categorias do Cardápio</span>
          </div>
          <span className="text-xs text-stone-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'doce encontrado' : 'doces encontrados'}
          </span>
        </div>

        {/* Categories Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50/70 text-stone-700 hover:bg-rose-100'
                }`}
              >
                <span>{getCategoryIcon(cat)}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Quick Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do bolo, ingrediente, brigadeiro..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white border border-rose-200 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterBadge('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterBadge === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterBadge('featured')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              filterBadge === 'featured'
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Mais Pedidos
          </button>
          <button
            onClick={() => setFilterBadge('free-shipping')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              filterBadge === 'free-shipping'
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            Frete Grátis
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="w-full bg-white border border-rose-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-hidden focus:border-rose-400 cursor-pointer shadow-xs"
            >
              <option value="popular">Destaques & Populares</option>
              <option value="rating">Mais Bem Avaliados ⭐</option>
              <option value="price-asc">Menor Preço (R$)</option>
              <option value="price-desc">Maior Preço (R$)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-rose-100 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <CakeSlice className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-stone-900 text-lg font-serif">
            Nenhum doce encontrado
          </h3>
          <p className="text-xs text-stone-500">
            Não encontramos itens correspondentes à sua busca ou filtro. Tente buscar por outros termos como "Ninho", "Brigadeiro" ou "Torta".
          </p>
          <button
            onClick={() => {
              onSelectCategory('Todos');
              onSearchChange('');
              setFilterBadge('all');
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer"
          >
            Limpar Filtros e Ver Cardápio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const fav = isFavorite(product.id);
            const isJustAdded = addedAnimationId === product.id;
            const discountPercent = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                id={`menu-product-${product.id}`}
                className="group bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Quick View trigger */}
                <div 
                  className="relative aspect-4/3 w-full overflow-hidden bg-rose-50 cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badges Container */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {discountPercent > 0 && (
                      <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                        -{discountPercent}% OFF
                      </span>
                    )}
                    {product.freeShipping && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        Frete Grátis
                      </span>
                    )}
                    {product.tags && product.tags[0] && (
                      <span className="bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        {product.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-stone-700 shadow-sm transition-all z-10 cursor-pointer"
                    title={fav ? 'Remover dos favoritos' : 'Favoritar produto'}
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        fav ? 'fill-rose-600 text-rose-600' : 'text-stone-600 hover:text-rose-600'
                      }`} 
                    />
                  </button>

                  {/* Quick View Button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 text-stone-900 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 hover:bg-stone-900 hover:text-white cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-rose-600" />
                    Personalizar / Detalhes
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                      <span className="font-bold text-rose-700 uppercase text-[10px] tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-stone-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-bold text-stone-900 font-serif text-base hover:text-rose-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Sizes / Options Preview */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                        <span className="font-semibold text-stone-700">Opções:</span>
                        <span className="truncate">{product.sizes.join(' • ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Add to Cart Action */}
                  <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through block">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg sm:text-xl font-extrabold text-stone-900 font-serif">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQuickView(product)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors hidden sm:block cursor-pointer"
                        title="Ver opções e personalizar"
                      >
                        Personalizar
                      </button>

                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 hover:bg-rose-700 text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Pedir</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Cart Order Summary Bar (if cart has items) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto animate-fadeIn">
          <div className="bg-stone-900 text-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border border-rose-400/40 flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center font-bold text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-rose-200">
                  {totalCartCount} {totalCartCount === 1 ? 'item na sua comanda' : 'itens na sua comanda'}
                </div>
                <div className="text-base sm:text-lg font-extrabold text-amber-300 font-serif">
                  Total: R$ {totalCartPrice.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-rose-900/50 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Ver Comanda & Pedir</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
