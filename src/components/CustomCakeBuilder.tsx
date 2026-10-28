import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Check, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Heart,
  Palette,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface CustomCakeBuilderProps {
  onAddCustomCakeToCart: (item: CartItem) => void;
  onBackToMenu: () => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  onAddCustomCakeToCart,
  onBackToMenu,
}) => {
  // Steps: 1: Size, 2: Batter, 3: Filling, 4: Frosting, 5: Toppings & Message
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState({ name: 'Médio (1.8 kg - serve 15 pessoas)', price: 95.00, weight: '1.8 kg' });
  const [selectedBatter, setSelectedBatter] = useState('Chocolate 50% Cacau');
  const [selectedFilling, setSelectedFilling] = useState('Brigadeiro Belga Tradicional');
  const [selectedSecondaryFilling, setSelectedSecondaryFilling] = useState('Leite Ninho Cremoso');
  const [selectedFrosting, setSelectedFrosting] = useState('Chantininho Aveludado');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Morangos Frescos no Topo']);
  const [customTopperText, setCustomTopperText] = useState('');
  const [themeColor, setThemeColor] = useState('Rosa & Dourado');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Available options
  const sizes = [
    { name: 'Pequeno (1.0 kg - serve 8 pessoas)', price: 70.00, weight: '1.0 kg', icon: '🎂' },
    { name: 'Médio (1.8 kg - serve 15 pessoas)', price: 95.00, weight: '1.8 kg', icon: '🍰' },
    { name: 'Grande (2.5 kg - serve 25 pessoas)', price: 140.00, weight: '2.5 kg', icon: '🎉' },
    { name: 'Festa Luxo (3.5 kg - serve 35 pessoas)', price: 195.00, weight: '3.5 kg', icon: '👑' },
  ];

  const batters = [
    { name: 'Chocolate 50% Cacau', desc: 'Massa úmida com cacau nobre intenso', color: '#3f1d1d' },
    { name: 'Baunilha Tradicional', desc: 'Massa fofinha com extrato natural de baunilha', color: '#fef08a' },
    { name: 'Red Velvet Aveludado', desc: 'Massa rubra com textura suave e macia', color: '#be123c' },
    { name: 'Cenoura Artesanal', desc: 'Feita com cenouras frescas e textura caseira', color: '#ea580c' },
  ];

  const fillings = [
    { name: 'Brigadeiro Belga Tradicional', desc: 'Chocolate 100% Callebaut cremoso' },
    { name: 'Leite Ninho Cremoso', desc: 'Brigadeiro aveludado de ninho puro' },
    { name: 'Doce de Leite Viçosa com Nozes', desc: 'Doce de leite premiado com nozes crocantes' },
    { name: 'Creme 4 Leites', desc: 'Leve, aerado e com sabor suave' },
    { name: 'Frutas Vermelhas com Cream Cheese', desc: 'Geleia artesanal com frosting suave (+ R$ 10,00)', extra: 10.00 },
    { name: 'Pistache Siciliano Nobre', desc: 'Pasta de pistache 100% pura (+ R$ 15,00)', extra: 15.00 },
  ];

  const frostings = [
    { name: 'Chantininho Aveludado', desc: 'Creme suave que derrete na boca', color: '#fbcfe8' },
    { name: 'Ganache de Chocolate Belga', desc: 'Cobertura brilhante e rica em cacau', color: '#451a03' },
    { name: 'Buttercream Sedoso', desc: 'Elegante acabamento estruturado', color: '#fef3c7' },
    { name: 'Naked Cake Rústico', desc: 'Sem cobertura lateral, mostrando as camadas de recheio', color: '#78350f' },
  ];

  const addonsList = [
    { name: 'Morangos Frescos no Topo', price: 8.00 },
    { name: 'Brigadeiros Gourmet Boleados no Topo (6 unid)', price: 12.00 },
    { name: 'Topo de Bolo Personalizado com Nome/Idade', price: 15.00 },
    { name: 'Flores Naturais Comestíveis', price: 14.00 },
    { name: 'Laço de Fita de Cetim e Embalagem Presente', price: 10.00 },
    { name: 'Vela de Aniversário Especial', price: 5.00 },
  ];

  const themeColors = [
    'Rosa Pastel & Dourado',
    'Azul Céu & Prata',
    'Off-White Floral Clássico',
    'Lilás Candy & Glitter',
    'Chocolate & Caramelo Rústico',
  ];

  // Calculate dynamic total price
  const basePrice = selectedSize.price;
  const fillingExtra = (fillings.find(f => f.name === selectedFilling)?.extra || 0) + 
                       (fillings.find(f => f.name === selectedSecondaryFilling)?.extra || 0);
  const addonsTotal = selectedAddons.reduce((sum, item) => {
    const found = addonsList.find(a => a.name === item);
    return sum + (found ? found.price : 0);
  }, 0);

  const totalPrice = basePrice + fillingExtra + addonsTotal;

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleFinishCustomCake = () => {
    const customProduct: Product = {
      id: `custom-cake-${Date.now()}`,
      name: `Bolo Personalizado - ${selectedBatter} (${selectedSize.weight})`,
      description: `Massa: ${selectedBatter} | Recheios: ${selectedFilling} + ${selectedSecondaryFilling} | Cobertura: ${selectedFrosting}`,
      price: totalPrice,
      category: 'Bolos & Tortas',
      rating: 5.0,
      reviewsCount: 1,
      images: [
        selectedBatter === 'Red Velvet Aveludado'
          ? 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80'
          : selectedBatter === 'Chocolate 50% Cacau'
          ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'
          : 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&q=80'
      ],
      inStock: true,
      tags: ['Personalizado', 'Sob Encomenda'],
      freeShipping: totalPrice > 150,
      specs: {
        'Tamanho': selectedSize.name,
        'Massa': selectedBatter,
        'Recheio 1': selectedFilling,
        'Recheio 2': selectedSecondaryFilling,
        'Cobertura': selectedFrosting,
        'Tema de Cores': themeColor,
        'Adicionais': selectedAddons.join(', ') || 'Nenhum',
        'Dedicatória': customTopperText || 'Sem mensagem no topo'
      }
    };

    const cartItem: CartItem = {
      product: customProduct,
      quantity: 1,
      selectedSize: selectedSize.name,
      selectedFlavor: `${selectedFilling} & ${selectedSecondaryFilling}`,
      customMessage: customTopperText,
      customAddons: selectedAddons,
      itemPrice: totalPrice
    };

    onAddCustomCakeToCart(cartItem);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onBackToMenu();
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fadeIn">
      {/* Title & Info Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Ateliê de Personalização
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight">
            Monte o Bolo dos Seus Sonhos
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Siga os 5 passos interativos para definir tamanho, massas nobres, recheios artesanais e decoração exclusiva.
          </p>
        </div>

        {/* Live Price Tag in Header */}
        <div className="bg-white/10 backdrop-blur-md border border-amber-300/30 p-4 rounded-2xl text-center shrink-0 min-w-44">
          <span className="text-[10px] uppercase tracking-wider text-amber-200 block font-bold">Orçamento em Tempo Real</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-[11px] text-amber-100 block mt-0.5">Encomenda Especial</span>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        {[
          { num: 1, label: '1. Tamanho' },
          { num: 2, label: '2. Massa' },
          { num: 3, label: '3. Recheios' },
          { num: 4, label: '4. Cobertura' },
          { num: 5, label: '5. Decoração' },
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5 text-rose-800" /> : null}
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Steps Content */}
      <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Step 1: Tamanho */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>Passo 1:</span> Escolha o Tamanho do Bolo
              </h3>
              <p className="text-xs text-stone-500">
                Selecione de acordo com o número de convidados da sua comemoração.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sizes.map((s) => {
                const isSelected = selectedSize.name === s.name;
                return (
                  <div
                    key={s.name}
                    onClick={() => setSelectedSize(s)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                        : 'border-stone-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-stone-900 text-sm sm:text-base">
                        <span className="text-xl">{s.icon}</span>
                        <span>{s.name}</span>
                      </div>
                      <p className="text-xs text-stone-500">Peso aprox. {s.weight}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-rose-700 font-serif">
                        R$ {s.price.toFixed(2).replace('.', ',')}
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                          Selecionado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Massa */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>Passo 2:</span> Escolha o Sabor da Massa
              </h3>
              <p className="text-xs text-stone-500">
                Nossas massas são artesanais, super fofinhas e assadas no dia da entrega.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {batters.map((b) => {
                const isSelected = selectedBatter === b.name;
                return (
                  <div
                    key={b.name}
                    onClick={() => setSelectedBatter(b.name)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                        : 'border-stone-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full border border-stone-300 shrink-0 shadow-inner flex items-center justify-center text-white"
                      style={{ backgroundColor: b.color }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base">{b.name}</h4>
                      <p className="text-xs text-stone-500">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Recheios (Até 2) */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>Passo 3:</span> Escolha até 2 Recheios Artesanais
              </h3>
              <p className="text-xs text-stone-500">
                Recheios abundantes cozidos lentamente na panela para a textura perfeita.
              </p>
            </div>

            {/* Recheio 1 */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                1º Recheio (Principal)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fillings.map((f) => {
                  const isSelected = selectedFilling === f.name;
                  return (
                    <div
                      key={`f1-${f.name}`}
                      onClick={() => setSelectedFilling(f.name)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/60 font-bold text-rose-900'
                          : 'border-stone-200 hover:border-rose-300 text-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-semibold">{f.name}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{f.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recheio 2 */}
            <div className="space-y-3 pt-3 border-t border-rose-100">
              <label className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                2º Recheio (Camada Dupla)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fillings.map((f) => {
                  const isSelected = selectedSecondaryFilling === f.name;
                  return (
                    <div
                      key={`f2-${f.name}`}
                      onClick={() => setSelectedSecondaryFilling(f.name)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 font-bold text-amber-950'
                          : 'border-stone-200 hover:border-amber-300 text-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-semibold">{f.name}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{f.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 ml-2" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Cobertura */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>Passo 4:</span> Escolha a Cobertura & Acabamento
              </h3>
              <p className="text-xs text-stone-500">
                A textura e o visual externo do seu bolo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {frostings.map((fr) => {
                const isSelected = selectedFrosting === fr.name;
                return (
                  <div
                    key={fr.name}
                    onClick={() => setSelectedFrosting(fr.name)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                        : 'border-stone-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full border border-stone-300 shrink-0 shadow-inner flex items-center justify-center text-white"
                      style={{ backgroundColor: fr.color }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-stone-800 drop-shadow" />}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base">{fr.name}</h4>
                      <p className="text-xs text-stone-500">{fr.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Theme Colors */}
            <div className="pt-4 border-t border-rose-100 space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Paleta de Cores da Decoração
              </label>
              <div className="flex flex-wrap gap-2">
                {themeColors.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setThemeColor(theme)}
                    className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                      themeColor === theme
                        ? 'bg-stone-900 text-white'
                        : 'bg-rose-50 text-stone-700 hover:bg-rose-100'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Decoração, Adicionais e Mensagem */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>Passo 5:</span> Detalhes Finais, Adicionais e Mensagem
              </h3>
              <p className="text-xs text-stone-500">
                Adicione mimos especiais como morangos, docinhos no topo ou topper personalizado.
              </p>
            </div>

            {/* Addons Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Adicionais Especiais (Opcional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'border-rose-600 bg-rose-50/70 text-rose-950 font-semibold'
                          : 'border-stone-200 hover:border-rose-300 text-stone-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{addon.name}</span>
                      <span className="text-xs font-bold text-rose-700 shrink-0 ml-2">
                        + R$ {addon.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Message Field */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Texto / Frase para o Topo do Bolo ou Cartãozinho
              </label>
              <input
                type="text"
                placeholder="Ex: 'Parabéns Mariana - 30 anos!' ou 'Com amor, Lucas'"
                value={customTopperText}
                onChange={(e) => setCustomTopperText(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
              />
              <p className="text-[11px] text-stone-400">
                Nossa confeiteira escreverá este texto com muito capricho!
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                <Cake className="w-4 h-4 text-rose-600" />
                Resumo da Sua Encomenda Personalizada
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                <div>• <strong>Tamanho:</strong> {selectedSize.name}</div>
                <div>• <strong>Massa:</strong> {selectedBatter}</div>
                <div>• <strong>Recheio 1:</strong> {selectedFilling}</div>
                <div>• <strong>Recheio 2:</strong> {selectedSecondaryFilling}</div>
                <div>• <strong>Cobertura:</strong> {selectedFrosting}</div>
                <div>• <strong>Paleta:</strong> {themeColor}</div>
              </div>
              {selectedAddons.length > 0 && (
                <div className="text-xs text-stone-700">
                  • <strong>Adicionais:</strong> {selectedAddons.join(', ')}
                </div>
              )}
              {customTopperText && (
                <div className="text-xs text-rose-800 font-medium">
                  • <strong>Dedicatória:</strong> "{customTopperText}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="pt-4 border-t border-rose-100 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              ← Voltar Passo
            </button>
          ) : (
            <button
              onClick={onBackToMenu}
              className="text-xs text-stone-500 hover:text-stone-800 underline font-medium cursor-pointer"
            >
              Cancelar e voltar ao Cardápio
            </button>
          )}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ml-auto"
            >
              <span>Avançar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishCustomCake}
              className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs sm:text-sm font-extrabold px-7 py-3 rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-200 active:scale-95 ml-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar Bolo à Minha Comanda (R$ {totalPrice.toFixed(2).replace('.', ',')})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
