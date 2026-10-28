import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, X } from 'lucide-react';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

interface ProductFiltersProps {
  selectedCategory: string;
  categories: string[];
  onSelectCategory: (cat: string) => void;
  priceRange: [number, number];
  maxPriceLimit: number;
  onPriceRangeChange: (range: [number, number]) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyFreeShipping: boolean;
  onToggleFreeShipping: () => void;
  onlyInStock: boolean;
  onToggleInStock: () => void;
  totalProductsCount: number;
  onResetFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  categories,
  onSelectCategory,
  priceRange,
  maxPriceLimit,
  onPriceRangeChange,
  sortOption,
  onSortChange,
  onlyFreeShipping,
  onToggleFreeShipping,
  onlyInStock,
  onToggleInStock,
  totalProductsCount,
  onResetFilters,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
      {/* Top Header Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
          <h3 className="font-bold text-stone-900 text-sm">Filtrar Produtos</h3>
          <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
            {totalProductsCount} {totalProductsCount === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="text-xs text-stone-500 hover:text-stone-900 underline flex items-center gap-1 font-medium transition-colors"
          >
            <X className="w-3 h-3" />
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Categories Buttons */}
      <div>
        <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-2">
          Categorias
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Controls: Sort, Price, Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Sort Select */}
        <div>
          <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-1.5">
            Ordenar Por
          </label>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white cursor-pointer"
            >
              <option value="relevance">Mais Populares / Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliados (Estrelas)</option>
              <option value="discount">Maiores Descontos (%)</option>
            </select>
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
            <span>Preço Máximo</span>
            <span className="text-stone-900 font-bold text-xs normal-case">
              Até R$ {priceRange[1].toFixed(2).replace('.', ',')}
            </span>
          </div>
          <input
            type="range"
            min={30}
            max={maxPriceLimit || 1000}
            step={10}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>R$ 30</span>
            <span>R$ {(maxPriceLimit || 1000).toFixed(0)}</span>
          </div>
        </div>

        {/* Checkbox Toggles */}
        <div className="flex flex-col justify-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
            <input
              type="checkbox"
              checked={onlyFreeShipping}
              onChange={onToggleFreeShipping}
              className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer accent-stone-900"
            />
            <span>Apenas com <strong className="text-emerald-700 font-semibold">Frete Grátis</strong></span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={onToggleInStock}
              className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer accent-stone-900"
            />
            <span>Somente produtos em estoque</span>
          </label>
        </div>
      </div>
    </div>
  );
};
