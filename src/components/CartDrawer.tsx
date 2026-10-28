import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { CartItem, Coupon, StoreConfig } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (couponCode: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
  storeConfig: StoreConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  storeConfig,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  
  const isFreeShipping = subtotal >= storeConfig.freeShippingThreshold || items.some(i => i.product.freeShipping);
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : 19.90);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const remainingForFreeShipping = Math.max(0, storeConfig.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / storeConfig.freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-base text-stone-900">Seu Carrinho</h2>
            <span className="bg-stone-200 text-stone-700 text-xs px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-100 text-xs">
          <div className="flex items-center justify-between font-semibold text-stone-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">Parabéns! Você ganhou Frete Grátis 🎉</span>
              ) : (
                <span>Faltam <strong className="text-amber-700">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para Frete Grátis</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500">{freeShippingProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-base">Seu carrinho está vazio</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Aproveite nossas promoções e adicione produtos incríveis para completar suas compras!
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-xs"
              >
                Explorar Produtos
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.product.id}-${idx}`} className="py-4 first:pt-0 last:pb-0 flex gap-3">
                {/* Thumb */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variant details */}
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="text-[11px] text-stone-500 flex gap-2 mt-0.5">
                        {item.selectedColor && <span>Cor: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Tam: {item.selectedSize}</span>}
                      </div>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xs text-stone-900">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-stone-400">
                          R$ {item.product.price.toFixed(2).replace('.', ',')} cada
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Cupom <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-emerald-700 hover:text-rose-600 font-bold ml-2 underline"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Possui cupom? (ex: BEMVINDO10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 uppercase outline-hidden focus:border-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {couponFeedback && !appliedCoupon && (
                <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponFeedback.success ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-bold">GRÁTIS</span>
                  ) : (
                    `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
