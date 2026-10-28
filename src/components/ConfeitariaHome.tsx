import React from 'react';
import { 
  Cake, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  ShoppingBag, 
  Star, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Award, 
  Check, 
  MessageCircle,
  Gift,
  UtensilsCrossed,
  CakeSlice,
  ChevronRight,
  Flame
} from 'lucide-react';
import { Product, StoreConfig } from '../types';
import { TESTIMONIALS } from '../data/mockProducts';

interface ConfeitariaHomeProps {
  storeConfig: StoreConfig;
  featuredProducts: Product[];
  onOpenMenu: (category?: string) => void;
  onOpenCustomCake: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const ConfeitariaHome: React.FC<ConfeitariaHomeProps> = ({
  storeConfig,
  featuredProducts = [],
  onOpenMenu,
  onOpenCustomCake,
  onAddToCart,
  onQuickView,
  isFavorite,
  onToggleFavorite,
}) => {
  const categoryHighlights = [
    {
      name: 'Bolos & Tortas',
      subtitle: 'Vulcões, Red Velvet e Tortas Holandesas',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
      badge: 'Favoritos'
    },
    {
      name: 'Doces Gourmet',
      subtitle: 'Brigadeiros Belgas, Macarons e Palhas',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
      badge: '100% Belga'
    },
    {
      name: 'Copos da Felicidade',
      subtitle: 'Camadas de Ninho, Nutella e Brownie',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
      badge: 'Super Recheado'
    },
    {
      name: 'Salgados & Quiches',
      subtitle: 'Empadas crocantes e Quiches francesas',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&q=80',
      badge: 'Massa Podre'
    },
    {
      name: 'Cafés & Bebidas',
      subtitle: 'Cappuccinos com Nutella e Sodas Italianas',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80',
      badge: 'Especiais'
    },
    {
      name: 'Kits Festa & Presentes',
      subtitle: 'Combos completos para aniversários e mimos',
      image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80',
      badge: 'Mais Econômico'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-rose-900 to-amber-950 text-white shadow-xl">
        {/* Subtle decorative confectionery background pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Soft decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 sm:py-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text Column */}
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Confeitaria Artesanal & Bolos Feitos com Amor
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-[1.15] text-white">
              A doçura artesanal que transforma momentos em <span className="text-amber-300 italic font-normal">pura celebração.</span>
            </h1>

            <p className="text-rose-100/90 text-sm sm:text-base md:text-lg leading-relaxed">
              Bolos fofinhos, brigadeiros feitos com autêntico chocolate belga Callebaut, tortas cremosas e copos da felicidade preparados diariamente para você.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onOpenMenu()}
                id="hero-order-button"
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-extrabold px-7 py-3.5 rounded-full text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-rose-900/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <CakeSlice className="w-5 h-5" />
                Fazer Pedido / Ver Cardápio
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomCake}
                className="bg-white/10 hover:bg-white/20 text-rose-100 border border-rose-300/30 font-bold px-6 py-3.5 rounded-full text-sm sm:text-base flex items-center gap-2 transition-all backdrop-blur-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Monte seu Bolo
              </button>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-rose-200/90">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>100% Artesanal & Fresco</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Chocolate Belga Nobre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Pronta Entrega & Encomendas</span>
              </div>
            </div>
          </div>

          {/* Right Visual Highlight Showcase */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-auto flex justify-center">
            <div className="relative w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-300/30 group">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80" 
                alt="Bolo Destaque Doce Ateliê" 
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-rose-900/90 backdrop-blur-md text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-700 flex items-center gap-1.5 shadow-md">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Bolo do Dia • Pronta Entrega
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-700/80 text-xs flex items-center justify-between shadow-xl">
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Mais Desejado</div>
                  <div className="font-bold text-white text-sm">Bolo Vulcão Ninho & Nutella</div>
                  <div className="text-[11px] text-rose-200">Serve 8 fatias generosas</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-300 font-extrabold text-base">R$ 68,00</div>
                  <button 
                    onClick={() => onOpenMenu('Bolos & Tortas')}
                    className="mt-1 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Pedir Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Value Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <Cake className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Receitas Exclusivas</h4>
            <p className="text-xs text-stone-500 mt-1">Massas aveludadas e recheios autorais com sabor inconfundível.</p>
          </div>
        </div>

        <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Ingredientes Nobres</h4>
            <p className="text-xs text-stone-500 mt-1">Chocolate belga Callebaut, manteiga de primeira e frutas frescas.</p>
          </div>
        </div>

        <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Entrega & Retirada</h4>
            <p className="text-xs text-stone-500 mt-1">Receba no conforto da sua casa ou retire fresquinho no nosso balcão.</p>
          </div>
        </div>

        <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm">Embalagens para Presente</h4>
            <p className="text-xs text-stone-500 mt-1">Caixas especiais com laço de cetim e cartões personalizados com amor.</p>
          </div>
        </div>
      </section>

      {/* Visual Categories Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-rose-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Explore Nosso Cardápio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight mt-1">
              Categorias de Doces & Delícias
            </h2>
          </div>
          <button
            onClick={() => onOpenMenu()}
            className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            Ver Cardápio Completo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryHighlights.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onOpenMenu(cat.name)}
              className="group relative h-56 rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {cat.badge}
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-rose-100/80">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs text-amber-300 font-bold">
                  <span>Pedir desta categoria</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase ("Mais Pedidos do Ateliê") */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Pronta Entrega & Encomendas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight mt-1">
              Os Queridinhos do Ateliê
            </h2>
          </div>
          <button
            onClick={() => onOpenMenu()}
            className="text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            Ver todos ({featuredProducts.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 6).map((product) => {
            const fav = isFavorite(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div 
                  className="relative aspect-4/3 w-full overflow-hidden bg-rose-50 cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-stone-700 shadow-sm transition-all z-10 cursor-pointer"
                    title={fav ? 'Remover dos favoritos' : 'Salvar como favorito'}
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-rose-600 text-rose-600' : 'text-stone-600'}`} />
                  </button>

                  {/* Tag */}
                  {product.tags && product.tags[0] && (
                    <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {product.tags[0]}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="text-rose-700 font-bold uppercase text-[10px] tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-stone-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-stone-400 text-[11px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-bold text-stone-900 font-serif text-base line-clamp-1 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block font-semibold">A partir de</span>
                      <span className="text-base sm:text-lg font-extrabold text-stone-900 font-serif">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Pedir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Custom Cake Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-rose-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Personalização Exclusiva
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif tracking-tight">
              Quer um bolo exatamente do seu jeito?
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              Use nossa ferramenta interativa para escolher a massa fofinha, combinar até 2 recheios artesanais, definir a cobertura perfeita e adicionar topo com seu nome ou frase especial!
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenCustomCake}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm px-6 py-3 rounded-full flex items-center justify-center md:justify-start gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Montar Meu Bolo Personalizado
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="shrink-0 w-48 sm:w-60 h-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80"
              alt="Bolo Personalizado"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews / Depoimentos */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-rose-600 font-bold text-xs uppercase tracking-wider">
            Amor em Cada Pedido
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Mais de 1.500 bolos e caixas de doces entregues com índice de 99% de satisfação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-rose-50 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs">{testimonial.name}</h4>
                  <p className="text-[11px] text-rose-700 font-medium">{testimonial.productName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct WhatsApp Callout */}
      <section className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-800 font-bold text-base sm:text-lg">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            Precisa de ajuda ou orçamento para grandes eventos?
          </div>
          <p className="text-xs sm:text-sm text-emerald-700">
            Nossa equipe de confeiteiras atende diretamente no WhatsApp para tirar dúvidas e criar orçamentos personalizados.
          </p>
        </div>

        <a
          href={`https://wa.me/${storeConfig.phoneWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Olá Doce Ateliê! Gostaria de tirar dúvidas sobre encomendas de bolos e doces.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all shrink-0 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          Falar com a Confeiteira
        </a>
      </section>
    </div>
  );
};
