import React from 'react';
import { 
  Cake, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Mail, 
  Truck, 
  Store, 
  ShieldCheck, 
  Sparkles, 
  Heart,
  HelpCircle,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { StoreConfig } from '../types';

interface ConfeitariaAboutProps {
  storeConfig: StoreConfig;
  onOpenMenu: () => void;
  onOpenCustomCake: () => void;
}

export const ConfeitariaAbout: React.FC<ConfeitariaAboutProps> = ({
  storeConfig,
  onOpenMenu,
  onOpenCustomCake,
}) => {
  const faqs = [
    {
      q: 'Com quanto tempo de antecedência devo encomendar um bolo?',
      a: 'Temos bolos pronta-entrega todos os dias na loja! Para bolos personalizados sob medida ou kits festa com mais de 2kg, recomendamos encomendar com 24h a 48h de antecedência.'
    },
    {
      q: 'Vocês realizam entregas delivery refrigeradas?',
      a: 'Sim! Nossos entregadores utilizam caixas térmicas rígidas especiais para garantir que seu bolo, torta ou copo da felicidade chegue intacto, fresquinho e perfeito.'
    },
    {
      q: 'Como funciona a retirada no balcão da loja?',
      a: 'É super simples e sem fila! Você faz seu pedido aqui no site ou WhatsApp, e quando chegar na confeitaria seu pacote já estará embalado com laço de presente e seu nome na comanda.'
    },
    {
      q: 'Quais as formas de pagamento aceitas?',
      a: 'Aceitamos PIX com 5% de desconto automático, Cartões de Crédito (com parcelamento em até 3x sem juros), Cartões de Débito e Dinheiro na entrega.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-3.5 py-1 rounded-full text-xs font-bold">
          <Store className="w-3.5 h-3.5 text-amber-300" />
          Nosso Ateliê & Confeitaria
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
          Feito à Mão com Ingredientes Nobres & Muito Carinho
        </h1>
        <p className="text-xs sm:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed">
          Fundada com o propósito de transformar receitas de família em doces inesquecíveis. Conheça nossa loja física ou receba em casa!
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Localização & Retirada */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-base font-serif">Endereço do Ateliê</h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              {storeConfig.address}
            </p>
            <p className="text-[11px] text-rose-700 font-semibold mt-1">
              Estacionamento gratuito para clientes em frente ao balcão.
            </p>
          </div>
        </div>

        {/* Horários de Funcionamento */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-base font-serif">Horário de Atendimento</h3>
            <div className="text-xs text-stone-600 mt-1.5 space-y-1">
              <div>• <strong>Seg a Sex:</strong> 08:30 às 19:30</div>
              <div>• <strong>Sábado:</strong> 09:00 às 19:00</div>
              <div>• <strong>Domingo & Feriados:</strong> 09:00 às 15:00</div>
            </div>
          </div>
        </div>

        {/* Contato & WhatsApp */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 text-base font-serif">Fale Conosco</h3>
            <div className="text-xs text-stone-600 mt-1.5 space-y-1.5">
              <a 
                href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                WhatsApp: {storeConfig.phoneWhatsapp}
              </a>
              <div className="flex items-center gap-1 text-rose-700">
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram: {storeConfig.instagram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story & Commitment */}
      <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-rose-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            Nossa Paixão por Confeitar
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Acreditamos que cada celebração merece um doce memorável
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            No Doce Ateliê, não usamos conservantes químicos, misturas prontas ou aromatizantes artificiais. Cada brigadeiro é enrolado à mão com confeitos de chocolate belga, cada massa é assada lentamente e cada morango é cuidadosamente selecionado.
          </p>
          <div className="space-y-2 text-xs font-semibold text-stone-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Chocolates nobres 100% Callebaut & Nestlé Profissional</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cozinha artesanal com rigoroso controle de higiene e segurança</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Embalagens sustentáveis e sofisticadas prontas para presentear</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-rose-200">
          <img 
            src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80" 
            alt="Confeitaria Doce Ateliê" 
            className="w-full h-80 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-rose-600 font-bold text-xs uppercase tracking-wider">
            Tire Suas Dúvidas
          </span>
          <h3 className="text-2xl font-extrabold text-stone-900 font-serif">
            Perguntas Frequentes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-rose-100 rounded-2xl p-5 space-y-2 shadow-xs">
              <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Order Callout */}
      <div className="bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-xl font-serif">Pronto para escolher suas doçuras?</h4>
          <p className="text-xs sm:text-sm text-rose-100">Acesse nosso cardápio online com fotos de dar água na boca.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onOpenMenu}
            className="bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Ver Cardápio
          </button>
          <button
            onClick={onOpenCustomCake}
            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Monte seu Bolo
          </button>
        </div>
      </div>
    </div>
  );
};
