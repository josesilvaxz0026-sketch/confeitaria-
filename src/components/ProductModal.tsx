import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Info
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{ price: number; days: number } | null>(null);
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs'>('details');
  const [showAddedAlert, setShowAddedAlert] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleCalculateCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, '').length < 8) return;
    
    setIsCalculatingCep(true);
    setTimeout(() => {
      setIsCalculatingCep(false);
      if (product.freeShipping) {
        setShippingResult({ price: 0, days: 3 });
      } else {
        setShippingResult({ price: 18.90, days: 4 });
      }
    }, 600);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setShowAddedAlert(true);
    setTimeout(() => {
      setShowAddedAlert(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200/90 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Section */}
          <div className="p-6 bg-stone-50 border-r border-stone-100 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-inner relative">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx 
                          ? 'border-stone-900 shadow-xs scale-105' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-6 pt-4 border-t border-stone-200/60 grid grid-cols-2 gap-2 text-[11px] text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantia de 12 meses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Envio rastreado</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Tags */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  {product.category}
                </span>
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-rose-600 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Favorito' : 'Salvar'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              {/* Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} avaliações de clientes)</span>
              </div>

              {/* Price */}
              <div className="mt-4 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                {product.installments && (
                  <p className="text-xs text-stone-600 mt-1">
                    em até <strong className="text-stone-900">{product.installments}x de R$ {(product.price / product.installments).toFixed(2).replace('.', ',')}</strong> sem juros
                  </p>
                )}
                <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  5% de desconto extra pagando com PIX
                </div>
              </div>

              {/* Color Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Cor: <strong className="text-stone-900">{selectedColor}</strong>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform flex items-center justify-center ${
                          selectedColor === c.name 
                            ? 'border-stone-900 scale-110 shadow-xs' 
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#f8fafc' || c.hex === '#cbd5e1' ? 'text-stone-900' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Picker */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Tamanho Selecionado: <strong className="text-stone-900">{selectedSize}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                          selectedSize === s
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs: Description vs Specs */}
              <div className="mt-6 border-b border-stone-200 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-stone-900 text-stone-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Descrição Completa
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-stone-900 text-stone-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Especificações Técnicas
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-3 text-xs text-stone-600 leading-relaxed">
                {activeTab === 'details' ? (
                  <p>{product.fullDescription || product.description}</p>
                ) : (
                  <div className="space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    {product.specs ? (
                      Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-stone-200/50 last:border-0">
                          <span className="font-semibold text-stone-700">{key}:</span>
                          <span className="text-stone-600 text-right">{val}</span>
                        </div>
                      ))
                    ) : (
                      <p>Especificações padrão inclusas na embalagem.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping Simulator */}
              <div className="mt-5 pt-4 border-t border-stone-100">
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Calcular Frete e Prazo
                </label>
                <form onSubmit={handleCalculateCep} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP (ex: 01310-100)"
                    value={cep}
                    maxLength={9}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isCalculatingCep}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    {isCalculatingCep ? 'Calculando...' : 'Calcular'}
                  </button>
                </form>

                {shippingResult && (
                  <div className="mt-2 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <span>Entrega Expressa ({shippingResult.days} dias úteis):</span>
                    <strong>
                      {shippingResult.price === 0 ? 'GRÁTIS' : `R$ ${shippingResult.price.toFixed(2).replace('.', ',')}`}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add Button */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              {showAddedAlert && (
                <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm animate-fadeIn">
                  <Check className="w-4 h-4" />
                  Item adicionado ao carrinho com sucesso!
                </div>
              )}

              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-2xl bg-stone-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  Adicionar ao Carrinho • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
