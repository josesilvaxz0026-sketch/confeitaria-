import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Store, 
  PackagePlus, 
  Sliders, 
  Check, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface StoreAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  storeConfig: StoreConfig;
  onUpdateStoreConfig: (config: StoreConfig) => void;
  categories: string[];
}

export const StoreAdminModal: React.FC<StoreAdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  storeConfig,
  onUpdateStoreConfig,
  categories,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'new-product' | 'manage-products' | 'store-settings'>('new-product');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // New Product State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[1] || 'Tecnologia');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [freeShipping, setFreeShipping] = useState(true);
  const [installments, setInstallments] = useState('10');

  // Store Settings State
  const [storeName, setStoreName] = useState(storeConfig.name);
  const [slogan, setSlogan] = useState(storeConfig.slogan);
  const [phoneWhatsapp, setPhoneWhatsapp] = useState(storeConfig.phoneWhatsapp);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(storeConfig.freeShippingThreshold.toString());
  const [announcementText, setAnnouncementText] = useState(storeConfig.announcementText);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const parsedPrice = parseFloat(price.replace(',', '.'));
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice.replace(',', '.')) : undefined;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      category,
      price: isNaN(parsedPrice) ? 99.90 : parsedPrice,
      originalPrice: parsedOriginalPrice && !isNaN(parsedOriginalPrice) ? parsedOriginalPrice : undefined,
      description: description || 'Produto exclusivo de alta qualidade selecionado para você.',
      fullDescription: description || 'Produto de altíssima qualidade com garantia oficial, fabricado com os melhores materiais do mercado.',
      images: [imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      freeShipping,
      installments: parseInt(installments) || 6,
      tags: ['Novo']
    };

    onAddProduct(newProd);
    setSuccessNotice('Produto cadastrado com sucesso!');
    setName('');
    setPrice('');
    setOriginalPrice('');
    setImageUrl('');
    setDescription('');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  const handleSaveStoreConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreConfig({
      name: storeName,
      slogan,
      phoneWhatsapp,
      freeShippingThreshold: parseFloat(freeShippingThreshold) || 199,
      announcementText,
    });
    setSuccessNotice('Configurações da loja salvas com sucesso!');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Store className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-base">Painel de Gerenciamento da Loja</h2>
              <p className="text-xs text-stone-400">Cadastre produtos e edite os dados do seu e-commerce</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-5 pt-3 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('new-product')}
            className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'new-product'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <PackagePlus className="w-4 h-4 text-amber-500" />
            Cadastrar Novo Produto
          </button>

          <button
            onClick={() => setActiveTab('manage-products')}
            className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'manage-products'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            Produtos Atuais ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('store-settings')}
            className={`pb-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'store-settings'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Store className="w-4 h-4 text-amber-500" />
            Dados da Loja
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {successNotice && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4" />
              {successNotice}
            </div>
          )}

          {/* TAB 1: New Product */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tênis Esportivo Ultra Running"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Categoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  >
                    {categories.filter(c => c !== 'Todos').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Preço Atual (R$) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 199.90"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Preço Original / De (R$) (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: 299.90"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Parcelas sem juros</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  >
                    <option value="1">1x</option>
                    <option value="3">3x</option>
                    <option value="6">6x</option>
                    <option value="10">10x</option>
                    <option value="12">12x</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">URL da Imagem (Unsplash ou Web)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    Deixe em branco para usar imagem de demonstração padrão.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    placeholder="Detalhes, benefícios e material do produto..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                    <input
                      type="checkbox"
                      checked={freeShipping}
                      onChange={(e) => setFreeShipping(e.target.checked)}
                      className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900"
                    />
                    <span>Produto com <strong>Frete Grátis</strong></span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  Salvar e Adicionar à Loja
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Manage Products */}
          {activeTab === 'manage-products' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-500 mb-2">
                Listagem de todos os {products.length} produtos disponíveis no catálogo.
              </div>

              <div className="divide-y divide-stone-100 max-h-[55vh] overflow-y-auto">
                {products.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs text-stone-900 truncate">{p.name}</h4>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span className="text-amber-700 font-medium">{p.category}</span>
                          <span>•</span>
                          <strong className="text-stone-800">R$ {p.price.toFixed(2).replace('.', ',')}</strong>
                          {p.freeShipping && <span className="text-emerald-700 font-bold">• Frete Grátis</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                      title="Excluir produto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Store Settings */}
          {activeTab === 'store-settings' && (
            <form onSubmit={handleSaveStoreConfig} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Nome da Loja</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Slogan / Subtítulo</label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">WhatsApp para Atendimento e Pedidos</label>
                <input
                  type="text"
                  value={phoneWhatsapp}
                  onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  placeholder="+55 11 99999-9999"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Valor Mínimo para Frete Grátis (R$)</label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Texto da Barra de Anúncios no Topo</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 outline-hidden focus:border-stone-400 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  Salvar Dados da Loja
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
