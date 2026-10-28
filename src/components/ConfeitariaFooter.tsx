import React, { useState } from 'react';
import { 
  Cake, 
  Heart, 
  Instagram, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Lock,
  Store,
  QrCode,
  CreditCard,
  Banknote
} from 'lucide-react';
import { StoreConfig } from '../types';

interface ConfeitariaFooterProps {
  storeConfig: StoreConfig;
  onNavigateTab: (tab: 'home' | 'menu' | 'custom-cake' | 'about') => void;
  onSelectCategory: (cat: string) => void;
  onOpenAdmin: () => void;
}

export const ConfeitariaFooter: React.FC<ConfeitariaFooterProps> = ({
  storeConfig,
  onNavigateTab,
  onSelectCategory,
  onOpenAdmin,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-stone-900 rounded-3xl p-6 sm:p-8 border border-rose-800/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Clube Doce Ateliê
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              Ganhe 10% OFF no seu primeiro pedido
            </h3>
            <p className="text-xs text-rose-200/80 max-w-md">
              Cadastre seu e-mail para receber cupons exclusivos, novidades de sabores e presentes de aniversário.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Digite seu melhor e-mail..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-stone-950/80 border border-rose-700/50 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-stone-400 focus:outline-hidden focus:border-rose-400 w-full md:w-72"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>{subscribed ? 'Inscrito!' : 'Quero Desconto'}</span>
            </button>
          </form>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif font-extrabold text-lg text-white tracking-tight">
                {storeConfig.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {storeConfig.slogan}. Produção artesanal diária com chocolate belga, frutas frescas e muito carinho para suas comemorações.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-serif">
              Navegação & Cardápio
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Início (Destaques & Novidades)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('menu')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Cardápio Completo & Pedidos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('custom-cake')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Monte seu Bolo Personalizado
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Confeitaria, Retirada & Horários
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-serif">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Bolos & Tortas', 'Doces Gourmet', 'Copos da Felicidade', 'Kits Festa & Presentes'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateTab('menu');
                    }}
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs text-stone-400">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-serif">
              Atendimento & Retirada
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{storeConfig.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{storeConfig.openingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>WhatsApp: {storeConfig.phoneWhatsapp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {storeConfig.name}. Feito com</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>para todos os momentos doces da vida.</span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <span className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-lg">
              <QrCode className="w-3 h-3 text-emerald-400" /> PIX
            </span>
            <span className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-lg">
              <CreditCard className="w-3 h-3 text-amber-400" /> Cartão
            </span>
            <span className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-lg">
              <Banknote className="w-3 h-3 text-green-400" /> Dinheiro
            </span>
            <button
              onClick={onOpenAdmin}
              className="ml-2 text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Acesso da Confeiteira / Painel"
            >
              <Lock className="w-3 h-3" />
              <span>Painel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
