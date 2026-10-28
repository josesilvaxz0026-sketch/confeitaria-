import React from 'react';
import { 
  Cake, 
  ShoppingBag, 
  Heart, 
  Search, 
  Phone, 
  Clock, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Menu as MenuIcon, 
  X,
  UtensilsCrossed,
  CakeSlice,
  Instagram,
  Gift
} from 'lucide-react';
import { StoreConfig } from '../types';

export type NavTab = 'home' | 'menu' | 'custom-cake' | 'about';

interface ConfeitariaHeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  storeConfig: StoreConfig;
  cartCount: number;
  favoritesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
}

export const ConfeitariaHeader: React.FC<ConfeitariaHeaderProps> = ({
  currentTab,
  onSelectTab,
  storeConfig,
  cartCount,
  favoritesCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenFavorites,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-rose-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 text-rose-200 font-medium">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {storeConfig.announcementText}
            </span>
            <span className="hidden md:inline text-rose-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-rose-300">
              <Gift className="w-3.5 h-3.5 text-rose-300" />
              Cupom de 10% OFF: <strong className="text-amber-300 font-bold ml-1">DOCE10</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
              title="Atendimento no WhatsApp da Confeitaria"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: {storeConfig.phoneWhatsapp}
            </a>
            
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-rose-200 hover:text-white bg-rose-800/60 hover:bg-rose-800 px-2 py-0.5 rounded-full transition-colors text-[11px] font-medium border border-rose-700/50"
              title="Acessar painel de gerenciamento e cadastro de bolos e doces"
            >
              <PlusCircle className="w-3 h-3 text-amber-300" />
              Painel Confeiteira
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-300">
              <Cake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 font-serif">
                  {storeConfig.name}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 hidden sm:inline-block">
                  Artesanal
                </span>
              </div>
              <p className="text-xs text-rose-900/70 font-medium">
                {storeConfig.slogan}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-rose-50/70 p-1.5 rounded-2xl border border-rose-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-stone-700 hover:text-rose-700 hover:bg-white/50'
              }`}
            >
              🏠 Início
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'menu'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-rose-700 hover:bg-white/50'
              }`}
            >
              <CakeSlice className="w-3.5 h-3.5" />
              Cardápio & Pedidos
            </button>
            <button
              onClick={() => handleNavClick('custom-cake')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'custom-cake'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-amber-800 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Monte seu Bolo
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentTab === 'about'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-stone-700 hover:text-rose-700 hover:bg-white/50'
              }`}
            >
              📍 Confeitaria & Horários
            </button>
          </nav>

          {/* Action Buttons: Search, Favorites, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-44 lg:w-56">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar bolo, doce..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => {
                  if (currentTab !== 'menu') onSelectTab('menu');
                }}
                className="w-full bg-rose-50/50 border border-rose-200/80 rounded-full pl-9 pr-3 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl text-stone-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Ver doces favoritos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart / Comanda Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-button"
              className="relative bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs px-3.5 sm:px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md shadow-rose-200 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Minha Sacola</span>
              <span className="bg-white text-rose-700 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-rose-50 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-600" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar bolo vulcão, brigadeiro, torta..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => {
                if (currentTab !== 'menu') onSelectTab('menu');
              }}
              className="w-full bg-rose-50/70 border border-rose-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 bg-white rounded-2xl border border-rose-100 shadow-xl space-y-1.5 animate-fadeIn">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentTab === 'home' ? 'bg-rose-50 text-rose-700' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>🏠 Início & Vitrine</span>
              <span className="text-[10px] text-stone-400">Página Principal</span>
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentTab === 'menu' ? 'bg-rose-600 text-white' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CakeSlice className="w-4 h-4" />
                Cardápio & Pedidos
              </span>
              <span className="text-[10px] opacity-80">Fazer Pedido</span>
            </button>
            <button
              onClick={() => handleNavClick('custom-cake')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentTab === 'custom-cake' ? 'bg-amber-600 text-white' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Monte seu Bolo
              </span>
              <span className="text-[10px] opacity-80">Personalizado</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                currentTab === 'about' ? 'bg-rose-50 text-rose-700' : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>📍 Confeitaria, Retirada & Horários</span>
              <span className="text-[10px] text-stone-400">Informações</span>
            </button>

            <div className="pt-2 border-t border-rose-100 flex items-center justify-between px-2 text-xs">
              <a
                href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Pedir no WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-rose-700 font-medium hover:underline text-[11px]"
              >
                Painel Confeiteira
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
