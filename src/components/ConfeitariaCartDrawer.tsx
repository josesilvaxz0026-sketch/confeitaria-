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
  Store, 
  Check, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MessageCircle,
  Sparkles,
  Gift
} from 'lucide-react';
import { CartItem, Coupon, StoreConfig } from '../types';

interface ConfeitariaCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (couponCode: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  onProceedToCheckout: (deliveryType: 'delivery' | 'pickup', scheduledDate: string, scheduledTime: string, notes: string) => void;
  storeConfig: StoreConfig;
}

export const ConfeitariaCartDrawer: React.FC<ConfeitariaCartDrawerProps> = ({
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

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [scheduledDate, setScheduledDate] = useState('Hoje');
  const [scheduledTime, setScheduledTime] = useState('O mais rápido possível (em até 60-90 min)');
  const [orderNotes, setOrderNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.itemPrice || item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const isFreeShipping = deliveryType === 'pickup' || subtotal >= storeConfig.freeShippingThreshold || items.some(i => i.product.freeShipping);
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : 12.00);
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

  // WhatsApp Order Generator
  const generateWhatsAppMessage = () => {
    let msg = `🍰 *NOVO PEDIDO - ${storeConfig.name.toUpperCase()}*\n`;
    msg += `---------------------------------\n`;
    items.forEach((item, idx) => {
      const price = (item.itemPrice || item.product.price) * item.quantity;
      msg += `*${idx + 1}. ${item.quantity}x ${item.product.name}*\n`;
      if (item.selectedSize) msg += `   • Tamanho: ${item.selectedSize}\n`;
      if (item.selectedFlavor) msg += `   • Sabor: ${item.selectedFlavor}\n`;
      if (item.customAddons && item.customAddons.length > 0) msg += `   • Adicionais: ${item.customAddons.join(', ')}\n`;
      if (item.customMessage) msg += `   • Dedicatória: "${item.customMessage}"\n`;
      msg += `   • Subtotal item: R$ ${price.toFixed(2).replace('.', ',')}\n\n`;
    });

    msg += `---------------------------------\n`;
    msg += `*Tipo de Atendimento:* ${deliveryType === 'delivery' ? '🛵 Entrega Delivery' : '🛍️ Retirada no Balcão'}\n`;
    msg += `*Data:* ${scheduledDate}\n`;
    msg += `*Horário:* ${scheduledTime}\n`;
    if (orderNotes) msg += `*Observações:* ${orderNotes}\n`;
    msg += `---------------------------------\n`;
    msg += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (appliedCoupon) msg += `Desconto (${appliedCoupon.code}): -R$ ${discountAmount.toFixed(2).replace('.', ',')}\n`;
    msg += `Taxa de Entrega: ${shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}\n`;
    msg += `*VALOR TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    msg += `Gostaria de confirmar a comanda e enviar o endereço e forma de pagamento!`;

    const encoded = encodeURIComponent(msg);
    const cleanPhone = storeConfig.phoneWhatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-rose-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-stone-900 font-serif">Minha Sacola & Comanda</h2>
              <span className="text-xs text-rose-700 font-medium">
                {items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-200/60 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress (Delivery only) */}
        {deliveryType === 'delivery' && (
          <div className="px-5 py-2.5 bg-rose-50/50 border-b border-rose-100 text-xs">
            <div className="flex items-center justify-between font-semibold text-stone-800 mb-1">
              <span className="flex items-center gap-1 text-rose-700">
                <Truck className="w-3.5 h-3.5" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-bold">Parabéns! Você ganhou Frete Grátis 🎉</span>
                ) : (
                  <span>Faltam <strong className="text-rose-700">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para Frete Grátis</span>
                )}
              </span>
              <span className="text-[10px] text-stone-500 font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-rose-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 text-base font-serif">Sua sacola está vazia</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore nosso cardápio de bolos artesanais, brigadeiros gourmet e salgados para montar sua comanda!
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item, index) => {
                  const unitPrice = item.itemPrice || item.product.price;
                  const itemTotalPrice = unitPrice * item.quantity;

                  return (
                    <div 
                      key={`${item.product.id}-${index}`}
                      className="p-3 bg-white border border-rose-100 rounded-2xl shadow-xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-rose-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-xs sm:text-sm text-stone-900 font-serif truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                              title="Remover item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Options badges */}
                          <div className="text-[11px] text-stone-500 space-y-0.5 mt-0.5">
                            {item.selectedSize && (
                              <div>• {item.selectedSize}</div>
                            )}
                            {item.selectedFlavor && (
                              <div>• Sabor: {item.selectedFlavor}</div>
                            )}
                            {item.customAddons && item.customAddons.length > 0 && (
                              <div className="text-rose-700">• {item.customAddons.join(', ')}</div>
                            )}
                            {item.customMessage && (
                              <div className="text-amber-800 italic">• "{item.customMessage}"</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Controls */}
                      <div className="pt-2 border-t border-rose-50 flex items-center justify-between">
                        <div className="flex items-center border border-stone-200 rounded-lg p-0.5 bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-stone-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-stone-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-sm text-stone-900 font-serif">
                            R$ {itemTotalPrice.toFixed(2).replace('.', ',')}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-stone-400 block">
                              (R$ {unitPrice.toFixed(2).replace('.', ',')} un.)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Type Switcher */}
              <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Como deseja receber?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-rose-100'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    Delivery
                  </button>

                  <button
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-rose-100'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    Retirar na Loja (Grátis)
                  </button>
                </div>
              </div>

              {/* Scheduling Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    Data do Pedido
                  </label>
                  <select
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-stone-800 cursor-pointer outline-hidden focus:border-rose-400"
                  >
                    <option value="Hoje">Hoje (Pronta Entrega)</option>
                    <option value="Amanhã">Amanhã</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                    <option value="Outra data (combinar)">Outra data no WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    Horário Preferencial
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-stone-800 cursor-pointer outline-hidden focus:border-rose-400"
                  >
                    <option value="O mais rápido possível">O mais rápido (60-90 min)</option>
                    <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                    <option value="Tarde (13h às 16h)">Tarde (13h às 16h)</option>
                    <option value="Fim de tarde (16h às 19h)">Fim de tarde (16h às 19h)</option>
                  </select>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="bg-white p-3 rounded-2xl border border-rose-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-rose-600" />
                    Cupom de Desconto
                  </span>
                  {appliedCoupon && (
                    <button
                      onClick={onRemoveCoupon}
                      className="text-rose-600 hover:underline font-bold text-[11px] cursor-pointer"
                    >
                      Remover cupom
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-xl text-xs flex items-center justify-between font-bold">
                    <span>Cupom {appliedCoupon.code} aplicado ({appliedCoupon.discountPercent}% OFF)</span>
                    <span className="text-emerald-700">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: DOCE10 ou BEMVINDO"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 uppercase focus:outline-hidden focus:border-rose-400 font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-rose-600 font-medium">
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                  Observações Gerais do Pedido (Opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Tocar a campainha 302, bolo sem canela, etc."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Totals and Checkout CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-rose-100 bg-white space-y-3 shadow-lg">
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal dos Doces:</span>
                <span className="font-semibold text-stone-800">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Desconto ({appliedCoupon.code}):</span>
                  <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxa de Entrega ({deliveryType === 'delivery' ? 'Delivery' : 'Retirada'}):</span>
                <span className="font-semibold text-stone-800">
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-700">Grátis</strong>
                  ) : (
                    `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                  )}
                </span>
              </div>
              <div className="pt-1.5 border-t border-stone-100 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-stone-900">Total a Pagar:</span>
                <span className="font-extrabold text-xl text-rose-700 font-serif">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp Quick Order Button */}
              <button
                onClick={generateWhatsAppMessage}
                id="cart-whatsapp-order-button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Pedido pelo WhatsApp</span>
              </button>

              {/* Online Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(deliveryType, scheduledDate, scheduledTime, orderNotes)}
                id="cart-checkout-button"
                className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all active:scale-95 cursor-pointer"
              >
                <span>Finalizar Pedido Online (PIX / Cartão)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
