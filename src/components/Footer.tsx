import React, { useState } from 'react';
import { 
  Store, 
  ShieldCheck, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  Check,
  QrCode,
  ArrowRight,
  Heart
} from 'lucide-react';
import { StoreConfig } from '../types';

interface FooterProps {
  storeConfig: StoreConfig;
  categories: string[];
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  storeConfig,
  categories,
  onSelectCategory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      {/* Newsletter Strip */}
      <div className="border-b border-stone-800 bg-stone-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-white font-bold text-base sm:text-lg flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              Receba ofertas exclusivas e cupons no seu e-mail
            </h3>
            <p className="text-xs text-stone-400">
              Cadastre-se para ganhar 10% de desconto na sua primeira compra!
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              placeholder="Digite seu melhor e-mail..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-stone-800 border border-stone-700 focus:border-amber-400 focus:bg-stone-900 text-white text-xs rounded-xl px-4 py-2.5 outline-hidden sm:w-72"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            >
              {newsletterSubscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Cadastrado!
                </>
              ) : (
                <>
                  Inscrever-se
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                <Store className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white font-serif tracking-tight">
                {storeConfig.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {storeConfig.slogan}. Produtos selecionados com rigorosa qualidade, entrega rápida e garantia total para você.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {storeConfig.phoneWhatsapp}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Loja 100% Confiável & Verificada</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Departamentos
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional / Support */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Atendimento & Ajuda
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); alert('Dúvidas frequentes: Prazo de entrega médio de 2 a 7 dias úteis.'); }} className="hover:text-white transition-colors">
                  Perguntas Frequentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#trocas" onClick={(e) => { e.preventDefault(); alert('Política de Trocas: 7 dias para devolução grátis garantida por lei.'); }} className="hover:text-white transition-colors">
                  Política de Trocas & Devoluções
                </a>
              </li>
              <li>
                <a href="#rastreamento" onClick={(e) => { e.preventDefault(); alert('Rastreamento: O código de envio é emitido após aprovação do pagamento.'); }} className="hover:text-white transition-colors">
                  Rastrear Meu Pedido
                </a>
              </li>
              <li>
                <a href="#privacidade" onClick={(e) => { e.preventDefault(); alert('Privacidade: Seus dados estão protegidos pela LGPD.'); }} className="hover:text-white transition-colors">
                  Termos de Uso e Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Formas de Pagamento
            </h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded text-stone-300 flex items-center gap-1 font-mono text-[11px]">
                  <QrCode className="w-3 h-3 text-emerald-400" /> PIX (-5%)
                </span>
                <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded text-stone-300 flex items-center gap-1 text-[11px]">
                  <CreditCard className="w-3 h-3 text-amber-400" /> Visa / Master
                </span>
                <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded text-stone-300 flex items-center gap-1 text-[11px]">
                  Elo / Hipercard
                </span>
                <span className="bg-stone-800 border border-stone-700 px-2.5 py-1 rounded text-stone-300 flex items-center gap-1 text-[11px]">
                  Boleto Bancário
                </span>
              </div>

              <div className="pt-2">
                <h5 className="font-bold text-white text-[11px] uppercase tracking-wider mb-2">
                  Segurança Certificada
                </h5>
                <div className="inline-flex items-center gap-2 bg-stone-800/80 border border-stone-700 px-3 py-1.5 rounded-lg text-xs text-stone-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SSL 256-bit Encriptado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {storeConfig.name}. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com tecnologia de ponta
          </p>
        </div>
      </div>
    </footer>
  );
};
