import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Truck, 
  Store, 
  ArrowLeft, 
  CheckCircle2, 
  Check, 
  Sparkles,
  Lock
} from 'lucide-react';
import { CartItem, Coupon, OrderDetails, StoreConfig } from '../types';

interface ConfeitariaCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: Coupon | null;
  deliveryType: 'delivery' | 'pickup';
  scheduledDate: string;
  scheduledTime: string;
  orderNotes: string;
  storeConfig: StoreConfig;
  onOrderComplete: (order: OrderDetails) => void;
}

export const ConfeitariaCheckoutModal: React.FC<ConfeitariaCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  deliveryType,
  scheduledDate,
  scheduledTime,
  orderNotes,
  storeConfig,
  onOrderComplete,
}) => {
  if (!isOpen || items.length === 0) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'money' | 'card_on_delivery'>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Subtotal and discounts
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.itemPrice || item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const isFreeShipping = deliveryType === 'pickup' || subtotal >= storeConfig.freeShippingThreshold || items.some(i => i.product.freeShipping);
  const shipping = isFreeShipping ? 0 : 12.00;

  // Extra 5% discount for PIX
  const pixDiscount = paymentMethod === 'pix' ? (subtotal * 0.05) : 0;
  const totalDiscount = couponDiscount + pixDiscount;
  const total = Math.max(0, subtotal - totalDiscount + shipping);

  const handleCepBlur = () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then(res => res.json())
        .then(data => {
          setIsLoadingCep(false);
          if (!data.erro) {
            setStreet(data.logradouro || '');
            setNeighborhood(data.bairro || '');
            setCity(data.localidade || '');
            setState(data.uf || 'SP');
          }
        })
        .catch(() => {
          setIsLoadingCep(false);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Por favor, informe seu nome e telefone WhatsApp.');
      return;
    }
    if (deliveryType === 'delivery' && (!street || !number || !neighborhood)) {
      alert('Por favor, preencha os dados de endereço para entrega.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: OrderDetails = {
        id: `DOCE-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('pt-BR', { 
          day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        }),
        items: [...items],
        subtotal,
        discount: totalDiscount,
        shipping,
        total,
        deliveryType,
        scheduledDate,
        scheduledTime,
        notes: orderNotes,
        customer: {
          name,
          email: email || `${name.toLowerCase().replace(/\s+/g, '')}@cliente.com`,
          phone,
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state
        },
        paymentMethod,
        changeFor: paymentMethod === 'money' ? changeFor : undefined,
        status: 'pending'
      };

      onOrderComplete(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-rose-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-rose-100 bg-rose-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-stone-900 font-serif">
                Finalizar Pedido • Doce Ateliê
              </h2>
              <p className="text-xs text-rose-800">
                {deliveryType === 'delivery' ? '🛵 Entrega em Domicílio' : '🛍️ Retirada no Balcão'} • {scheduledDate} ({scheduledTime})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-200/60 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 text-rose-800">
              <span>1. Seus Dados de Contato</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Eduarda Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (11) 98765-4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address (if Delivery chosen) */}
          {deliveryType === 'delivery' ? (
            <div className="space-y-3 pt-3 border-t border-rose-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  <span>2. Endereço de Entrega</span>
                </h3>
                {isLoadingCep && <span className="text-xs text-rose-600 font-medium">Buscando CEP...</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">CEP</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={handleCepBlur}
                    maxLength={9}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Rua / Avenida *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Rua das Flores"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Complemento</label>
                  <input
                    type="text"
                    placeholder="Apto 42, Bloco B"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jardins"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Cidade</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-1 text-xs">
              <div className="font-bold text-rose-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-rose-600" />
                Retirada no Balcão da Confeitaria Doce Ateliê
              </div>
              <p className="text-stone-600">
                {storeConfig.address} • Horário: {storeConfig.openingHours}
              </p>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3 pt-3 border-t border-rose-100">
            <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider text-rose-800">
              3. Forma de Pagamento
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* PIX */}
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 hover:border-emerald-300 text-stone-700 bg-white'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-600 mb-1" />
                <div className="text-xs font-bold">PIX</div>
                <div className="text-[10px] text-emerald-700 font-extrabold">5% de Desconto</div>
              </button>

              {/* Cartão de Crédito */}
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-bold'
                    : 'border-stone-200 hover:border-rose-300 text-stone-700 bg-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-rose-600 mb-1" />
                <div className="text-xs font-bold">Cartão Online</div>
                <div className="text-[10px] text-stone-500">Até 3x sem juros</div>
              </button>

              {/* Dinheiro */}
              <button
                type="button"
                onClick={() => setPaymentMethod('money')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'money'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                    : 'border-stone-200 hover:border-amber-300 text-stone-700 bg-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-amber-600 mb-1" />
                <div className="text-xs font-bold">Dinheiro</div>
                <div className="text-[10px] text-stone-500">Pagar na entrega</div>
              </button>

              {/* Cartão na Entrega */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card_on_delivery')}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  paymentMethod === 'card_on_delivery'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold'
                    : 'border-stone-200 hover:border-purple-300 text-stone-700 bg-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-purple-600 mb-1" />
                <div className="text-xs font-bold">Maquininha</div>
                <div className="text-[10px] text-stone-500">Débito / Crédito</div>
              </button>
            </div>

            {/* If Money is selected, ask for change */}
            {paymentMethod === 'money' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
                <label className="text-xs font-bold text-amber-900 block">
                  Precisa de troco para quanto? (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Troco para R$ 100,00"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs text-stone-800"
                />
              </div>
            )}

            {/* If Credit Card is selected */}
            {paymentMethod === 'credit_card' && (
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8899"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary & Confirm Button */}
          <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs text-stone-600">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Desconto Total:</span>
                <span>- R$ {totalDiscount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-stone-600">
              <span>Taxa de Entrega:</span>
              <span>{shipping === 0 ? <strong className="text-emerald-700">Grátis</strong> : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
            </div>
            <div className="pt-2 border-t border-rose-200 flex justify-between items-baseline">
              <span className="font-extrabold text-sm text-stone-900">Total a Pagar:</span>
              <span className="font-extrabold text-2xl text-rose-700 font-serif">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-200 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Confirmando seu Pedido...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmar Pedido (R$ {total.toFixed(2).replace('.', ',')})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
