import React from 'react';
import { Truck, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

interface BannerProps {
  onExploreClick: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onExploreClick }) => {
  return (
    <div className="space-y-6">
      {/* Hero Highlight */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white shadow-lg">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Coleção Exclusiva de Lançamentos
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-white leading-tight">
              Ofertas Especiais com <span className="text-amber-400">até 40% OFF</span>
            </h2>
            
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Encontre os melhores produtos com qualidade garantida, parcelamento em até 12x sem juros e entrega expressa para todo o Brasil.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                Ver Todas as Ofertas
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="text-xs text-stone-400 px-3 py-2 bg-white/5 rounded-full backdrop-blur-xs">
                Use o cupom: <strong className="text-amber-300">BEMVINDO10</strong> (10% OFF)
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-auto flex justify-center">
            <div className="w-64 sm:w-72 md:w-80 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-800 relative group">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" 
                alt="Destaque da Loja" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-stone-900/90 backdrop-blur-md p-2.5 rounded-xl border border-stone-700/60 text-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase">Mais Desejado</div>
                  <div className="font-semibold text-white">Fone Noise Cancelling Pro</div>
                </div>
                <div className="text-amber-400 font-bold">R$ 389,90</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Envio Rápido & Seguro</h4>
            <p className="text-xs text-stone-500">Rastreamento em tempo real do seu pedido</p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Garantia e Devolução</h4>
            <p className="text-xs text-stone-500">7 dias para troca ou devolução grátis</p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Pagamento Flexível</h4>
            <p className="text-xs text-stone-500">PIX com desconto ou até 12x no cartão</p>
          </div>
        </div>
      </div>
    </div>
  );
};
