import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Gift, 
  Info,
  Layers,
  UtensilsCrossed
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface ConfeitariaProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: CartItem) => void;
}

export const ConfeitariaProductModal: React.FC<ConfeitariaProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'Tamanho Padrão');
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{ price: number; time: string } | null>(null);
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);
  const [showAddedAlert, setShowAddedAlert] = useState(false);

  const productAddons = [
    { name: 'Vela de Aniversário Especial', price: 5.00 },
    { name: 'Embalagem de Presente com Laço de Fita', price: 8.00 },
    { name: 'Adicional de Morangos Frescos', price: 7.00 },
    { name: 'Cartãozinho Escrito à Mão', price: 4.00 }
  ];

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, name) => {
    const found = productAddons.find(a => a.name === name);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleCalculateCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, '').length < 8) return;
    
    setIsCalculatingCep(true);
    setTimeout(() => {
      setIsCalculatingCep(false);
      if (product.freeShipping) {
        setShippingResult({ price: 0, time: 'Hoje ou no dia agendado (Frete Grátis)' });
      } else {
        setShippingResult({ price: 12.00, time: 'Hoje em até 90 min ou sob agendamento' });
      }
    }, 500);
  };

  const handleAdd = () => {
    const item: CartItem = {
      product,
      quantity,
      selectedSize,
      selectedFlavor,
      customMessage: customMessage.trim() || undefined,
      customAddons: selectedAddons.length > 0 ? selectedAddons : undefined,
      itemPrice: unitPrice
    };

    onAddToCart(item);
    setShowAddedAlert(true);
    setTimeout(() => {
      setShowAddedAlert(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-rose-100 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Images Section */}
          <div className="p-6 bg-rose-50/40 border-r border-rose-100 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-rose-200 shadow-inner relative">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Favorite */}
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-stone-700 shadow-sm transition-all z-10 cursor-pointer"
                  title="Salvar nos favoritos"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600 text-rose-600' : 'text-stone-600'}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === i ? 'border-rose-600 scale-95' : 'border-rose-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Note */}
            <div className="bg-white p-3.5 rounded-2xl border border-rose-100 text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Garantia de Qualidade Doce Ateliê
              </div>
              <p className="text-[11px] text-stone-500">
                Produzido artesanalmente no dia do envio com ingredientes nobres e amor em cada detalhe.
              </p>
            </div>
          </div>

          {/* Product Info & Customization */}
          <div className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-bold text-rose-700 uppercase tracking-wider text-[10px] bg-rose-100 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 font-semibold text-stone-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewsCount} avaliações)</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.fullDescription || product.description}
                </p>
              </div>

              {/* Price */}
              <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Valor Unitário</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-stone-900 font-serif">
                      R$ {unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                </div>

                {product.freeShipping && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Frete Grátis
                  </span>
                )}
              </div>

              {/* Size / Portion Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Tamanho / Porção:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors / Variation */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Sabor / Variação:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedFlavor(c.name)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                          selectedFlavor === c.name
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Add-ons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Adicionais & Mimos (Opcional):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {productAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.name);
                    return (
                      <div
                        key={addon.name}
                        onClick={() => toggleAddon(addon.name)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                          isChecked
                            ? 'border-rose-600 bg-rose-50 font-bold text-rose-900'
                            : 'border-stone-200 text-stone-700 hover:border-rose-300'
                        }`}
                      >
                        <span className="truncate">{addon.name}</span>
                        <span className="text-[11px] text-rose-700 ml-1 shrink-0">
                          + R$ {addon.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom message/dedication */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Dedicatória ou Observação para a Confeiteira (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: 'Escrever Parabéns Júlia!' ou 'Retiro às 15h'"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Shipping / Delivery Check */}
              <div className="pt-2 border-t border-rose-100">
                <form onSubmit={handleCalculateCep} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Calcular entrega (CEP: 00000-000)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400"
                  />
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {isCalculatingCep ? 'Calculando...' : 'Calcular'}
                  </button>
                </form>

                {shippingResult && (
                  <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between">
                    <span>{shippingResult.time}</span>
                    <strong className="font-bold">
                      {shippingResult.price === 0 ? 'Grátis' : `R$ ${shippingResult.price.toFixed(2).replace('.', ',')}`}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-rose-100 flex items-center justify-between gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-stone-200 rounded-xl p-1 bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-white text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-white text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all active:scale-95 cursor-pointer"
              >
                {showAddedAlert ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar ao Pedido (R$ {totalPrice.toFixed(2).replace('.', ',')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
