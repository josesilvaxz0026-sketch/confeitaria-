import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  FileText, 
  Lock, 
  Truck, 
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, Coupon, OrderDetails, StoreConfig } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: Coupon | null;
  storeConfig: StoreConfig;
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  storeConfig,
  onOrderComplete,
}) => {
  if (!isOpen || items.length === 0) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardInstallments, setCardInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const isFreeShipping = subtotal >= storeConfig.freeShippingThreshold || items.some(i => i.product.freeShipping);
  const shipping = isFreeShipping ? 0 : 19.90;
  
  // Extra 5% discount for PIX
  const pixDiscount = paymentMethod === 'pix' ? (subtotal * 0.05) : 0;
  const totalDiscount = couponDiscount + pixDiscount;
  const total = Math.max(0, subtotal - totalDiscount + shipping);

  const handleCepBlur = () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      // Fetch via ViaCEP or fallback simulation
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
          // Fallback demo values if offline/blocked
          setStreet('Av. Paulista');
          setNeighborhood('Bela Vista');
          setCity('São Paulo');
          setState('SP');
        });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !cep || !street || !number) {
      alert('Por favor, preencha todos os campos obrigatórios de endereço e contato.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: OrderDetails = {
        id: `PED-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        subtotal,
        discount: totalDiscount,
        shipping,
        total,
        deliveryType: 'delivery',
        customer: {
          name,
          email,
          phone,
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        },
        paymentMethod,
        status: 'approved',
      };

      onOrderComplete(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-base">Ambiente Seguro de Finalização</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          
          {/* Main Form Fields */}
          <div className="p-6 lg:col-span-2 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Dados Pessoais */}
            <div>
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">E-mail para confirmação *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Endereço de Entrega */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Endereço de Entrega
                </h3>
                {isLoadingCep && <span className="text-xs text-amber-600 font-medium">Buscando CEP...</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">CEP *</label>
                  <input
                    type="text"
                    required
                    maxLength={9}
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={handleCepBlur}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Rua / Avenida *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Av. Paulista"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 1000"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Complemento</label>
                  <input
                    type="text"
                    placeholder="Apto, Bloco..."
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Bairro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Cidade *</label>
                  <input
                    type="text"
                    required
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Estado (UF) *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="SP"
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 uppercase outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Forma de Pagamento */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-bold">3</span>
                Forma de Pagamento
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {/* PIX */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold">PIX</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">5% OFF</span>
                </button>

                {/* Cartão */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-stone-900" />
                  <span className="text-xs font-bold">Cartão</span>
                  <span className="text-[10px] text-stone-500">Até 12x</span>
                </button>

                {/* Boleto */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'boleto'
                      ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                  }`}
                >
                  <FileText className="w-5 h-5 text-stone-900" />
                  <span className="text-xs font-bold">Boleto</span>
                  <span className="text-[10px] text-stone-500">À vista</span>
                </button>
              </div>

              {/* Payment Details details conditional view */}
              <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                {paymentMethod === 'pix' && (
                  <div className="text-xs text-stone-700 space-y-1.5">
                    <p className="font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Aprovação Imediata + 5% de Desconto Adicional!
                    </p>
                    <p className="text-stone-500 leading-relaxed">
                      O código QR e a chave Copia e Cola do PIX serão gerados na próxima etapa para pagamento instantâneo pelo aplicativo do seu banco.
                    </p>
                  </div>
                )}

                {paymentMethod === 'credit_card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-mono outline-hidden focus:border-stone-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">Nome Impresso no Cartão</label>
                      <input
                        type="text"
                        placeholder="NOME COMO NO CARTAO"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 uppercase outline-hidden focus:border-stone-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">Validade (MM/AA)</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-mono outline-hidden focus:border-stone-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-mono outline-hidden focus:border-stone-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">Parcelamento</label>
                      <select
                        value={cardInstallments}
                        onChange={(e) => setCardInstallments(Number(e.target.value))}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 cursor-pointer"
                      >
                        <option value={1}>1x de R$ {total.toFixed(2).replace('.', ',')} sem juros</option>
                        <option value={2}>2x de R$ {(total / 2).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value={3}>3x de R$ {(total / 3).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value={6}>6x de R$ {(total / 6).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value={10}>10x de R$ {(total / 10).toFixed(2).replace('.', ',')} sem juros</option>
                        <option value={12}>12x de R$ {(total / 12).toFixed(2).replace('.', ',')} sem juros</option>
                      </select>
                    </div>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="text-xs text-stone-700 space-y-1.5">
                    <p className="font-bold text-stone-900">Boleto Bancário</p>
                    <p className="text-stone-500 leading-relaxed">
                      O boleto será gerado ao concluir o pedido. O vencimento é em 3 dias úteis e a compensação ocorre em até 48 horas após o pagamento.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="p-6 bg-stone-50 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-stone-900 pb-2 border-b border-stone-200">
                Resumo do Pedido ({items.reduce((a, b) => a + b.quantity, 0)} itens)
              </h3>

              {/* Items preview list */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-800 truncate">{item.product.name}</div>
                      <div className="text-stone-500 text-[11px]">Qtd: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}</div>
                    </div>
                    <div className="font-bold text-stone-900 shrink-0">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Cupom ({appliedCoupon.code})</span>
                    <span>- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Desconto PIX (5%)</span>
                    <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="font-medium">
                    {shipping === 0 ? <strong className="text-emerald-700">GRÁTIS</strong> : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 text-white font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                {isProcessing ? 'Processando Pedido...' : `Confirmar Pedido • R$ ${total.toFixed(2).replace('.', ',')}`}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Seus dados estão 100% protegidos com criptografia SSL</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
