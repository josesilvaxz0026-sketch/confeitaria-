import React from 'react';
import { Star, ShoppingBag, Heart, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
}) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const installmentValue = product.installments 
    ? (product.price / product.installments).toFixed(2) 
    : null;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image & Badges */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
          {product.freeShipping && (
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Frete Grátis
            </span>
          )}
          {product.isNew && (
            <span className="bg-stone-900 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Novo
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-stone-700 shadow-sm transition-all z-10 active:scale-90"
          title={isFavorite ? 'Remover dos favoritos' : 'Favoritar produto'}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-600 hover:text-rose-500'
            }`} 
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 text-stone-900 font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 hover:bg-stone-900 hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          Espiada Rápida
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-amber-700 uppercase text-[10px] tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-stone-700 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-semibold text-stone-900 text-sm line-clamp-2 hover:text-amber-600 cursor-pointer transition-colors" 
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Price & Installments */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-stone-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          {installmentValue && (
            <p className="text-[11px] text-stone-500 mt-0.5">
              ou {product.installments}x de <strong className="text-stone-700 font-semibold">R$ {installmentValue.replace('.', ',')}</strong> sem juros
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="mt-3 w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};
