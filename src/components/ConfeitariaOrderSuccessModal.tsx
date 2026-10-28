import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  Cake, 
  Calendar, 
  MapPin, 
  X, 
  QrCode, 
  ArrowRight,
  Heart,
  Truck,
  Store
} from 'lucide-react';
import { OrderDetails, StoreConfig } from '../types';

interface ConfeitariaOrderSuccessModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  storeConfig: StoreConfig;
}

export const ConfeitariaOrderSuccessModal: React.FC<ConfeitariaOrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  storeConfig,
}) => {
  if (!isOpen || !order) return null;

  const [copiedPix, setCopiedPix] = useState(false);
  const pixCode = `00020126580014br.gov.bcb.pix0136doceatelie-${order.id}@banco.com.br520400005303986540${order.total.toFixed(2)}5802BR5925DoceAtelieConfeitaria6009SAOPAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá Doce Ateliê! Acabei de fazer o pedido #${order.id} no valor de R$ ${order.total.toFixed(2)}. Meu nome é ${order.customer.name}. Gostaria de acompanhar o preparo e a entrega!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-200 p-6 sm:p-8 space-y-6 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <Cake className="w-9 h-9" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Pedido Realizado com Sucesso!
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Obrigado pelo seu pedido, <strong className="text-stone-800">{order.customer.name}</strong>! Nossa equipe já começou a preparar suas doçuras com todo amor e carinho.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Comanda</span>
            <strong className="text-rose-900 font-mono font-bold text-sm">{order.id}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Data & Horário</span>
            <strong className="text-stone-900">{order.scheduledDate || 'Hoje'}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Atendimento</span>
            <strong className="text-stone-900">{order.deliveryType === 'delivery' ? '🛵 Delivery' : '🛍️ Retirada'}</strong>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Total a Pagar</span>
            <strong className="text-rose-700 font-extrabold text-sm">R$ {order.total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>

        {/* PIX Box if chosen */}
        {order.paymentMethod === 'pix' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs sm:text-sm">
                <QrCode className="w-5 h-5 text-emerald-700" />
                Pague com PIX para liberar o preparo imediato
              </div>
              <span className="text-[10px] bg-emerald-200/90 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
                Vence em 30 min
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-2">
              <p className="text-xs text-stone-600">
                Copie a chave PIX Copia-e-Cola abaixo e pague no seu app do banco:
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPix ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ordered Items Summary */}
        <div className="border border-stone-100 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Itens do Pedido ({order.items.reduce((s, i) => s + i.quantity, 0)})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-stone-700 border-b border-stone-50 pb-1.5">
                <div>
                  <span className="font-bold text-stone-900">{item.quantity}x</span> {item.product.name}
                  {item.selectedSize && <span className="text-stone-400 ml-1">({item.selectedSize})</span>}
                </div>
                <div className="font-semibold text-stone-900">
                  R$ {((item.itemPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp & Finish Action */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Acompanhar Pedido no WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-2xl transition-colors cursor-pointer"
          >
            Voltar para a Confeitaria
          </button>
        </div>
      </div>
    </div>
  );
};
