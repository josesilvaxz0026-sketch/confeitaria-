import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Store, 
  PlusCircle, 
  SlidersHorizontal,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { StoreConfig } from '../types';

interface HeaderProps {
  storeConfig: StoreConfig;
  cartCount: number;
  favoritesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
  selectedCategory: string;
  categories: string[];
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  cartCount,
  favoritesCount,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenFavorites,
  onOpenAdmin,
  selectedCategory,
  categories,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-4 text-stone-300 font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              ⚡ {storeConfig.announcementText}
            </span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-stone-400" />
              Frete Grátis acima de R$ {storeConfig.freeShippingThreshold.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 text-xs">
            <a 
              href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              Atendimento WhatsApp
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2 py-0.5 rounded transition-colors text-xs font-medium"
              title="Adicionar ou gerenciar produtos e dados da loja"
            >
              <PlusCircle className="w-3 h-3 text-emerald-400" />
              Cadastrar Produto / Loja
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <Store className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-stone-900 font-serif sm:text-2xl">
                {storeConfig.name}
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">
                {storeConfig.slogan}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="O que você está procurando hoje? (ex: fone, tênis, relógio...)"
                className="w-full bg-stone-100/90 border border-stone-200 focus:border-stone-400 focus:bg-white text-stone-800 text-sm rounded-full py-2.5 pl-11 pr-4 outline-hidden transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Favorites Button */}
            <button
              id="favorites-button"
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
              title="Meus Favoritos"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full bg-stone-100 border border-stone-200 focus:bg-white text-stone-800 text-sm rounded-full py-2 pl-10 pr-4 outline-hidden"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none border-t border-stone-100 mt-3 text-sm">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-stone-900 text-white shadow-xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
