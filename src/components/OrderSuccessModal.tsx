import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  Package, 
  Calendar, 
  MapPin, 
  X,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { OrderDetails, StoreConfig } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  storeConfig: StoreConfig;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  storeConfig,
}) => {
  if (!isOpen || !order) return null;

  const [copiedPix, setCopiedPix] = useState(false);
  const pixCode = `00020126580014br.gov.bcb.pix0136loja-${order.id}@banco.com.br520400005303986540${order.total.toFixed(2)}5802BR5925${storeConfig.name.replace(/\s/g, '')}6009SAOPAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de fazer o pedido #${order.id} no valor de R$ ${order.total.toFixed(2)} na loja ${storeConfig.name}. Gostaria de acompanhar o envio.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-serif">
            Pedido Realizado com Sucesso!
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Obrigado pela preferência, <strong className="text-stone-800">{order.customer.name}</strong>. Enviamos todos os detalhes para o e-mail <strong>{order.customer.email}</strong>.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Número</span>
            <strong className="text-stone-900 font-mono font-bold">{order.id}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Data</span>
            <strong className="text-stone-900">{order.date.split(' ')[0]}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Pagamento</span>
            <strong className="text-stone-900 uppercase">{order.paymentMethod === 'pix' ? 'PIX' : order.paymentMethod === 'credit_card' ? 'Cartão' : 'Boleto'}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Total</span>
            <strong className="text-emerald-700 font-extrabold">R$ {order.total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>

        {/* PIX Box if chosen */}
        {order.paymentMethod === 'pix' && (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <QrCode className="w-5 h-5 text-emerald-700" />
                Pague com PIX para liberar o envio imediato
              </div>
              <span className="text-[11px] bg-emerald-200/80 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                Vence em 30 min
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-xl border border-emerald-100">
              <div className="w-24 h-24 bg-stone-900 text-white rounded-lg flex items-center justify-center font-mono text-[10px] p-2 text-center shrink-0">
                [QR CODE PIX SIMULADO]
              </div>
              <div className="flex-1 w-full min-w-0 space-y-2">
                <p className="text-xs text-stone-600">
                  Copie a chave abaixo e cole no seu aplicativo bancário:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixCode}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-stone-700 select-all outline-hidden truncate"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedPix ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address Summary */}
        <div className="text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-start gap-3">
          <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-900 block font-semibold">Entrega no Endereço:</strong>
            <span>
              {order.customer.street}, {order.customer.number} {order.customer.complement && `(${order.customer.complement})`} - {order.customer.neighborhood}, {order.customer.city}/{order.customer.state} • CEP {order.customer.cep}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Acompanhar no WhatsApp
          </a>

          <button
            onClick={onClose}
            className="w-full sm:flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Continuar Comprando
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
