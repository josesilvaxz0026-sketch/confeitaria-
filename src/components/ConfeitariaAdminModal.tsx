import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Store, 
  Cake, 
  Sliders, 
  Check, 
  Sparkles, 
  Image as ImageIcon,
  Phone,
  MapPin,
  Clock,
  Instagram
} from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface ConfeitariaAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  storeConfig: StoreConfig;
  onUpdateStoreConfig: (config: StoreConfig) => void;
  categories: string[];
}

export const ConfeitariaAdminModal: React.FC<ConfeitariaAdminModalProps> = ({
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

  // New Confectionery Product State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[1] || 'Bolos & Tortas');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);
  const [sizesInput, setSizesInput] = useState('');
  const [tag, setTag] = useState('Destaque');

  // Store Settings State
  const [storeName, setStoreName] = useState(storeConfig.name);
  const [slogan, setSlogan] = useState(storeConfig.slogan);
  const [phoneWhatsapp, setPhoneWhatsapp] = useState(storeConfig.phoneWhatsapp);
  const [instagram, setInstagram] = useState(storeConfig.instagram || '@doceatelie.confeitaria');
  const [address, setAddress] = useState(storeConfig.address || 'Rua das Camélias, 142 - Jardins, São Paulo - SP');
  const [openingHours, setOpeningHours] = useState(storeConfig.openingHours || 'Segunda a Sábado das 08h30 às 19h30');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(storeConfig.freeShippingThreshold.toString());
  const [announcementText, setAnnouncementText] = useState(storeConfig.announcementText);
  const [pixKey, setPixKey] = useState(storeConfig.pixKey || 'pix@doceatelie.com.br');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const parsedPrice = parseFloat(price.replace(',', '.'));
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice.replace(',', '.')) : undefined;

    const newProd: Product = {
      id: `doce-${Date.now()}`,
      name,
      category,
      price: isNaN(parsedPrice) ? 45.00 : parsedPrice,
      originalPrice: parsedOriginalPrice && !isNaN(parsedOriginalPrice) ? parsedOriginalPrice : undefined,
      description: description || 'Doce artesanal feito com muito carinho e ingredientes de alta qualidade.',
      fullDescription: description || 'Preparado diariamente com receitas exclusivas e sabor inigualável para suas melhores comemorações.',
      images: [imageUrl.trim() || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'],
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      freeShipping,
      tags: tag ? [tag] : ['Novo'],
      sizes: sizesInput ? sizesInput.split(',').map(s => s.trim()) : undefined
    };

    onAddProduct(newProd);
    setSuccessNotice('Doce cadastrado com sucesso no cardápio!');
    setName('');
    setPrice('');
    setOriginalPrice('');
    setImageUrl('');
    setDescription('');
    setSizesInput('');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  const handleSaveStoreConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreConfig({
      name: storeName,
      slogan,
      phoneWhatsapp,
      instagram,
      address,
      openingHours,
      freeShippingThreshold: parseFloat(freeShippingThreshold) || 90,
      announcementText,
      pixKey,
    });
    setSuccessNotice('Configurações da Confeitaria salvas com sucesso!');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-rose-200 my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 bg-rose-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-stone-900 font-serif">
                Painel da Confeiteira • Gestão do Ateliê
              </h2>
              <p className="text-xs text-rose-800">
                Cadastre novos bolos, altere preços, endereço e dados do WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-200/60 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 bg-rose-50/30 px-4 pt-2 gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('new-product')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'new-product'
                ? 'border-rose-600 text-rose-700 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            + Cadastrar Bolo / Doce
          </button>
          <button
            onClick={() => setActiveTab('manage-products')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'manage-products'
                ? 'border-rose-600 text-rose-700 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Cardápio ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('store-settings')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'store-settings'
                ? 'border-rose-600 text-rose-700 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Dados da Confeitaria & WhatsApp
          </button>
        </div>

        {/* Success Toast */}
        {successNotice && (
          <div className="mx-5 mt-3 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-700" />
            {successNotice}
          </div>
        )}

        {/* Tab 1: New Product */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Nome do Doce / Bolo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Bolo de Cenoura Vulcão"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Categoria *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white cursor-pointer"
                  >
                    {categories.filter(c => c !== 'Todos').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Preço (R$) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 68.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Preço Antigo (R$)</label>
                  <input
                    type="text"
                    placeholder="Ex: 79.90 (para desconto)"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Tag / Selo</label>
                  <input
                    type="text"
                    placeholder="Ex: Mais Vendido, Novidade"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase block mb-1">URL da Foto do Doce</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Opções de Tamanho (separados por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: Fatia Individual, Médio (1.2kg), Grande (2.0kg)"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Descrição e Ingredientes</label>
                <textarea
                  rows={3}
                  placeholder="Descreva a massa, o recheio e os ingredientes especiais..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-hidden focus:border-rose-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="freeShippingCheck"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-400"
                />
                <label htmlFor="freeShippingCheck" className="text-xs font-semibold text-stone-700 cursor-pointer">
                  Oferecer com Frete Grátis
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-rose-200 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Cadastrar Doce no Cardápio
              </button>
            </form>
          )}

          {/* Tab 2: Manage Products */}
          {activeTab === 'manage-products' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Doces e Bolos Cadastrados no Cardápio ({products.length})
              </h3>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border border-rose-100 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-rose-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">{p.name}</h4>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span className="text-rose-700 font-semibold">{p.category}</span>
                          <span>•</span>
                          <span className="font-bold text-stone-800">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                      title="Excluir do cardápio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Store Settings */}
          {activeTab === 'store-settings' && (
            <form onSubmit={handleSaveStoreConfig} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Nome da Confeitaria</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Slogan</label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">WhatsApp para Pedidos</label>
                  <input
                    type="text"
                    value={phoneWhatsapp}
                    onChange={(e) => setPhoneWhatsapp(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Instagram</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Endereço da Confeitaria (para Retirada)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Horário de Funcionamento</label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Valor Mínimo para Frete Grátis (R$)</label>
                  <input
                    type="text"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase block mb-1">Aviso do Topo (Barra de Destaque)</label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Salvar Configurações da Confeitaria
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
