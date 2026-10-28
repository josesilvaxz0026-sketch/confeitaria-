import { Product, Coupon } from '../types';

export const CONFEITARIA_PRODUCTS: Product[] = [
  // BOLOS & TORTAS
  {
    id: 'bolo-1',
    name: 'Bolo Vulcão Ninho com Nutella',
    description: 'Massa fofinha de chocolate 50% coberta com cascata cremosa de Leite Ninho e Nutella pura.',
    fullDescription: 'Nosso campeão de vendas! Massa úmida de cacau nobre 50%, com uma farta cobertura cremosa de brigadeiro de Leite Ninho e vulcão recheado de Nutella autêntica. Finalizado com raspas de chocolate e leite ninho polvilhado.',
    price: 68.00,
    originalPrice: 79.90,
    category: 'Bolos & Tortas',
    rating: 5.0,
    reviewsCount: 184,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    freeShipping: true,
    tags: ['Mais Vendido', 'Vulcão', 'Destaque'],
    sizes: ['Médio (serve 6 a 8 pessoas)', 'Grande (serve 10 a 12 pessoas)', 'Fatia Generosa'],
    colors: [
      { name: 'Ninho com Nutella', hex: '#d97706' },
      { name: 'Brigadeiro Belga', hex: '#3f1d1d' },
      { name: 'Doce de Leite com Nozes', hex: '#b45309' }
    ],
    installments: 3,
    specs: {
      'Peso aproximado': 'Aprox. 1.2kg (Médio) / 2.0kg (Grande)',
      'Conservação': 'Geladeira por até 4 dias',
      'Tempo de preparo': 'Pronta entrega ou encomenda no mesmo dia',
      'Ingredientes': 'Cacau 50%, Leite Ninho, Nutella, Manteiga de primeira linha, ovos frescos'
    }
  },
  {
    id: 'bolo-2',
    name: 'Bolo Red Velvet Supreme com Frutas Vermelhas',
    description: 'Massa aveludada vermelha com recheio de cream cheese frosting artesanal e frutas frescas.',
    fullDescription: 'Um clássico sofisticado! Massa aveludada vermelha super macia, recheada e coberta com nosso autêntico frosting de cream cheese levemente cítrico. Decorado com morangos, amoras e mirtilos frescos selecionados.',
    price: 89.00,
    originalPrice: 105.00,
    category: 'Bolos & Tortas',
    rating: 4.9,
    reviewsCount: 96,
    images: [
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    freeShipping: true,
    tags: ['Especial', 'Frutas Frescas', 'Sofisticado'],
    sizes: ['Pequeno 1kg (6 a 8 fatias)', 'Médio 1.8kg (12 a 15 fatias)', 'Grande 2.8kg (20 fatias)'],
    colors: [
      { name: 'Red Velvet Clássico', hex: '#be123c' },
      { name: 'Red Velvet com Frutas Silvestres', hex: '#881337' }
    ],
    installments: 3,
    specs: {
      'Peso aproximado': '1.5 kg',
      'Recheio': 'Cream Cheese Frosting suave',
      'Validade': '3 dias refrigerado',
      'Decoração': 'Frutas vermelhas naturais frescas'
    }
  },
  {
    id: 'bolo-3',
    name: 'Torta Holandesa Cremosa Tradicional',
    description: 'Base crocante de biscoitos Calypso, creme aerado holandês e ganache de chocolate meio amargo.',
    fullDescription: 'Deliciosa torta com lateral cercada de biscoitos Calypso banhados em chocolate, recheada com nosso creme leve holandês à base de manteiga e baunilha, finalizada com ganache sedosa de chocolate meio amargo.',
    price: 75.00,
    originalPrice: 85.00,
    category: 'Bolos & Tortas',
    rating: 4.9,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Sobremesa Favorita', 'Cremosa'],
    sizes: ['Inteira 1.4kg (10 fatias)', 'Fatia Individual 180g'],
    colors: [
      { name: 'Chocolate Meio Amargo', hex: '#262626' },
      { name: 'Chocolate Branco & Frutas', hex: '#fef3c7' }
    ],
    installments: 2,
    specs: {
      'Rendimento': '10 fatias generosas',
      'Conservação': 'Consumir bem geladinha (freezer ou geladeira)',
      'Destaque': 'Ganache brilhante com chocolate nobre'
    }
  },
  {
    id: 'bolo-4',
    name: 'Bolo de Cenoura Fofinho com Brigadeiro de Panela',
    description: 'O clássico irresistível da vovó com cenouras frescas e calda farta de brigadeiro brilhante.',
    fullDescription: 'Aquele bolo quentinho que abraça a alma! Massa úmida de cenoura fresca feita no dia com muito amor, afogada em uma cobertura cremosa de brigadeiro tradicional de panela bem puxento.',
    price: 48.00,
    originalPrice: 55.00,
    category: 'Bolos & Tortas',
    rating: 5.0,
    reviewsCount: 230,
    images: [
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    freeShipping: false,
    tags: ['Caseirinho', 'Queridinho'],
    sizes: ['Forma Caseira (serve 8 pessoas)', 'Pote Individual 250g'],
    installments: 1,
    specs: {
      'Tipo': 'Bolo caseiro artesanal',
      'Validade': '5 dias em temperatura ambiente',
      'Massa': '100% cenoura fresca, sem corantes'
    }
  },
  {
    id: 'bolo-5',
    name: 'Bento Cake Personalizado (Frase ou Desenho)',
    description: 'Mini bolo na marmitinha para presentear, com frase divertida ou mensagem de amor gravada.',
    fullDescription: 'O presente perfeito para quem você ama! Mini bolo aro 10cm na caixinha especial com velinha e mini garfinho. Você escolhe o sabor da massa, do recheio e a frase ou meme que deseja escrever na cobertura de chantininho!',
    price: 38.00,
    originalPrice: 45.00,
    category: 'Bolos & Tortas',
    rating: 4.8,
    reviewsCount: 145,
    images: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&q=80',
      'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    isNew: true,
    freeShipping: false,
    tags: ['Personalizável', 'Presente', 'Meme'],
    sizes: ['Mini Bento (serve 2 a 3 fatias)'],
    colors: [
      { name: 'Rosa Pastel', hex: '#f472b6' },
      { name: 'Azul Bebê', hex: '#60a5fa' },
      { name: 'Lilás Candy', hex: '#c084fc' },
      { name: 'Branco Clássico', hex: '#f8fafc' }
    ],
    installments: 1,
    specs: {
      'Acompanha': 'Marmitinha decorada, laço de cetim, velinha e fósforo',
      'Frase': 'Você pode personalizar ao finalizar o pedido'
    }
  },

  // DOCES & BRIGADEIROS GOURMET
  {
    id: 'doce-1',
    name: 'Caixa Degustação 12 Brigadeiros Gourmet Belgas',
    description: 'Mix com os sabores mais nobres: Tradicional Belga, Ninho com Nutella, Pistache, Churros e Caramelo Flor de Sal.',
    fullDescription: 'Caixa presenteável luxo com visor transparente contendo 12 brigadeiros artesanais enrolados um a um. Confeitos de chocolate belga Callebaut, recheios macios e aveludados que derretem na boca.',
    price: 42.00,
    originalPrice: 49.90,
    category: 'Doces Gourmet',
    rating: 5.0,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80',
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    freeShipping: false,
    tags: ['Gourmet', 'Presente Luxo', 'Callebaut'],
    sizes: ['Caixa com 6 unid', 'Caixa com 12 unid', 'Caixa Festa com 24 unid'],
    colors: [
      { name: 'Sortidos Especiais', hex: '#451a03' },
      { name: '100% Chocolate Belga', hex: '#27170e' },
      { name: 'Ninho & Nutella', hex: '#b45309' }
    ],
    installments: 2,
    specs: {
      'Sabores inclusos': 'Belga Tradicional, Ninho com Nutella, Pistache Trufado, Churros com Doce de Leite Viçosa, Caramelo com Flor de Sal e Frutas Vermelhas',
      'Gramatura': 'Aprox. 22g por unidade'
    }
  },
  {
    id: 'doce-2',
    name: 'Macarons Franceses Artesanais (Caixa com 6)',
    description: 'Delicados discos crocantes por fora e macios por dentro com recheios aerados e cores candy.',
    fullDescription: 'Receita francesa tradicional feita com farinha de amêndoas puras. Recheios de baunilha de Madagascar, pistache siciliano, framboesa silvestre, chocolate trufado e maracujá.',
    price: 36.00,
    originalPrice: 42.00,
    category: 'Doces Gourmet',
    rating: 4.8,
    reviewsCount: 77,
    images: [
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
      'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Francês', 'Farinha de Amêndoas'],
    sizes: ['Caixa 6 Macarons', 'Caixa 12 Macarons'],
    installments: 1,
    specs: {
      'Base': 'Farinha de amêndoas 100% pura',
      'Glúten': 'Não contém glúten na receita padrão'
    }
  },
  {
    id: 'doce-3',
    name: 'Palha Italiana Artesanal Trufada de Brigadeiro',
    description: 'Cubos generosos de brigadeiro cremoso intercalados com pedacinhos crocantes de biscoito amanteigado.',
    fullDescription: 'A combinação perfeita de textura! Brigadeiro aveludado cozido lentamente, misturado com pedacinhos de biscoito e envolvido em uma fina camada de açúcar de confeiteiro e cacau.',
    price: 8.50,
    originalPrice: 10.00,
    category: 'Doces Gourmet',
    rating: 4.9,
    reviewsCount: 160,
    images: [
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Individual', 'Crocante'],
    sizes: ['Unidade 80g', 'Kit com 4 Unidades'],
    installments: 1,
    specs: {
      'Peso': '80g cada',
      'Sabores disponíveis': 'Tradicional Belga, Ninho, Oreo com Brigadeiro Branco'
    }
  },

  // COPOS DA FELICIDADE & SOBREMESAS DE POTE
  {
    id: 'copo-1',
    name: 'Copo da Felicidade Ninho, Nutella & Morango',
    description: 'Camadas generosas de brigadeiro de ninho, morangos frescos picados, brownie artesanal e Nutella.',
    fullDescription: 'Uma verdadeira explosão de sabor em 400ml! Montado em camadas: creme suave de Leite Ninho, pedaços fofos de brownie com casquinha crocante, morangos frescos suculentos e uma camada espessa de pura Nutella.',
    price: 24.90,
    originalPrice: 28.00,
    category: 'Copos da Felicidade',
    rating: 5.0,
    reviewsCount: 289,
    images: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    freeShipping: false,
    tags: ['Super Recheado', 'Top 1'],
    sizes: ['Copo 300ml', 'Copo 450ml Supremo'],
    installments: 1,
    specs: {
      'Tamanho': '400ml de pura gostosura',
      'Consumo': 'Ideal consumir no mesmo dia ou em até 2 dias geladinho'
    }
  },
  {
    id: 'copo-2',
    name: 'Banoffee Pie no Pote Artesanal',
    description: 'Base de biscoito amanteigado com canela, doce de leite cremoso, bananas frescas e chantilly suave.',
    fullDescription: 'A queridinha do momento! Feita com bananas caramelizadas no ponto certo, doce de leite artesanal com toque de baunilha, base crocante amanteigada e chantilly leve polvilhado com cacau e canela.',
    price: 19.90,
    originalPrice: 22.00,
    category: 'Copos da Felicidade',
    rating: 4.9,
    reviewsCount: 140,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Banoffee', 'Artesanal'],
    sizes: ['Pote 250g', 'Taça Família 1.2kg'],
    installments: 1,
    specs: {
      'Peso': '250g',
      'Ingredientes': 'Banana nanica selecionada, doce de leite mineiro, nata fresca batida'
    }
  },
  {
    id: 'copo-3',
    name: 'Brownie Supremo com Ganache e Nozes Crocantes',
    description: 'Brownie denso e úmido com chocolate meio amargo, coberto de ganache cremosa e nozes douradas.',
    fullDescription: 'Feito com 100% manteiga e chocolate nobre, casquinha craquelada perfeita e interior denso e macio. Acompanha pote de ganache morna e nozes picadinhas crocantes para você finalizar.',
    price: 16.50,
    originalPrice: 19.00,
    category: 'Copos da Felicidade',
    rating: 4.9,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Brownie Quentinho', 'Nozes'],
    sizes: ['Fatia Brownie 120g', 'Caixa com 4 Brownies Recheados'],
    installments: 1,
    specs: {
      'Dica': 'Aqueça 15 segundos no micro-ondas para uma experiência inesquecível!'
    }
  },

  // SALGADOS ARTESANAIS & QUICHES
  {
    id: 'salgado-1',
    name: 'Empada Especial de Frango Cremoso com Catupiry',
    description: 'Massa podre amanteigada que derrete na boca com recheio ultra cremoso e bem temperadinho.',
    fullDescription: 'Massa tradicional artesanal que esfarela com delicadeza ao morder. Recheio farto de peito de frango desfiado temperado com ervas frescas, tomate e uma colherada generosa do legítimo Catupiry.',
    price: 9.50,
    originalPrice: 11.00,
    category: 'Salgados & Quiches',
    rating: 4.9,
    reviewsCount: 204,
    images: [
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&q=80',
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Massa Folhada/Podre', 'Catupiry Original'],
    sizes: ['Individual 150g', 'Caixa com 6 unidades congeladas/assadas'],
    installments: 1,
    specs: {
      'Peso': '150g',
      'Opções': 'Frango com Catupiry, Palmito Pupunha Cremoso, Camarão Especial'
    }
  },
  {
    id: 'salgado-2',
    name: 'Quiche Lorraine Clássica (Queijo Gruyère & Bacon)',
    description: 'Fatia alta de quiche francesa com massa crocante, ovos frescos, creme de leite e cubinhos de bacon crocante.',
    fullDescription: 'Uma receita tradicional francesa perfeita para um lanche sofisticado. Massa brisée crocante, recheio leve e aerado com queijo Gruyère, queijo parmesão ralado na hora e cubinhos dourados de bacon.',
    price: 18.00,
    originalPrice: 22.00,
    category: 'Salgados & Quiches',
    rating: 4.8,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Gourmet', 'Quiche Francesa'],
    sizes: ['Fatia Individual', 'Quiche Inteira 22cm (serve 8 fatias)'],
    installments: 1,
    specs: {
      'Peso por fatia': '180g',
      'Sugestão': 'Acompanha perfeitamente uma saladinha fresca ou café coado'
    }
  },
  {
    id: 'salgado-3',
    name: 'Croissant Francês Folhado com Manteiga Pura',
    description: 'Massa folhada artesanal leve, dourada e crocante, produzida com manteiga de primeira qualidade.',
    fullDescription: 'Dias de fermentação e dobras manuais para garantir alvéolos perfeitos e textura ultra crocante por fora com miolo macio e amanteigado. Disponível tradicional ou recheado com queijo brie e geleia de damasco.',
    price: 14.50,
    originalPrice: 17.00,
    category: 'Salgados & Quiches',
    rating: 4.9,
    reviewsCount: 120,
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Folhado', 'Manteiga Pura'],
    sizes: ['Tradicional Manteiga', 'Recheado Brie & Damasco', 'Recheado Nutella'],
    installments: 1,
    specs: {
      'Origem': 'Receita clássica francesa',
      'Massa': 'Fermentação natural lenta 24h'
    }
  },

  // CAFÉS & BEBIDAS
  {
    id: 'bebida-1',
    name: 'Cappuccino Doce Ateliê com Borda de Nutella',
    description: 'Café expresso especial moído na hora, leite vaporizado cremoso, canela e borda generosa de Nutella com avelãs.',
    fullDescription: 'A estrela da nossa cafeteria! Expresso duplo de grãos 100% arábica do Sul de Minas, leite cremoso vaporizado com espuma aveludada, taça decorada com borda de Nutella e avelãs trituradas.',
    price: 15.90,
    originalPrice: 18.00,
    category: 'Cafés & Bebidas',
    rating: 5.0,
    reviewsCount: 220,
    images: [
      'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Café Especial', 'Nutella'],
    sizes: ['Taça 240ml', 'Caneca Grande 350ml'],
    installments: 1,
    specs: {
      'Grãos': '100% Arábica Torra Média',
      'Temperatura': 'Servido quentinho e cremoso'
    }
  },
  {
    id: 'bebida-2',
    name: 'Soda Italiana Refrescante de Frutas Vermelhas',
    description: 'Água com gás premium, xarope artesanal francês de framboesa e amoras frescas com gelo.',
    fullDescription: 'Bebida super refrescante e levemente adocicada, perfeita para acompanhar nossas tortas e salgados. Finalizada com fatias de limão siciliano e folhas de hortelã fresca.',
    price: 13.50,
    originalPrice: 15.00,
    category: 'Cafés & Bebidas',
    rating: 4.8,
    reviewsCount: 65,
    images: [
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
      'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80'
    ],
    inStock: true,
    isFeatured: false,
    freeShipping: false,
    tags: ['Refrescante', 'Sem Álcool'],
    sizes: ['Copo 400ml', 'Copo 600ml'],
    installments: 1,
    specs: {
      'Sabores': 'Frutas Vermelhas, Maçã Verde, Maracujá com Tangerina'
    }
  },

  // KITS FESTA & PRESENTES
  {
    id: 'kit-1',
    name: 'Kit Festa Doce Sonho (Bolo 1.5kg + 25 Brigadeiros + 25 Salgados)',
    description: 'Combo completo para comemorar com praticidade e elegância: bolo confeitado, doces gourmet e salgados assados.',
    fullDescription: 'Tudo pronto para a sua festa ser inesquecível! Inclui: 1 Bolo decorado de 1.5kg (sabor à sua escolha), 25 brigadeiros gourmet em forminhas especiais e 25 salgados artesanais fritos ou assados crocantes.',
    price: 198.00,
    originalPrice: 240.00,
    category: 'Kits Festa & Presentes',
    rating: 5.0,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80'
    ],
    inStock: true,
    isFeatured: true,
    freeShipping: true,
    tags: ['Combo Econômico', 'Festa Completa', 'Frete Grátis'],
    sizes: ['Kit Pequeno (10 a 12 pessoas)', 'Kit Médio (20 a 25 pessoas)', 'Kit Mega (35 a 40 pessoas)'],
    colors: [
      { name: 'Tema Rosa & Dourado', hex: '#f43f5e' },
      { name: 'Tema Azul & Branco', hex: '#3b82f6' },
      { name: 'Tema Neutro / Floral', hex: '#d97706' }
    ],
    installments: 4,
    specs: {
      'Rendimento': 'Serve com folga 10 a 12 convidados',
      'Personalização': 'Escolha os sabores ao confirmar o pedido via WhatsApp'
    }
  }
];

export const INITIAL_PRODUCTS: Product[] = CONFEITARIA_PRODUCTS;

export const CATEGORIES = [
  'Todos',
  'Bolos & Tortas',
  'Doces Gourmet',
  'Copos da Felicidade',
  'Salgados & Quiches',
  'Cafés & Bebidas',
  'Kits Festa & Presentes'
];

export const CONFEITARIA_CATEGORIES = CATEGORIES;

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'DOCE10',
    discountPercent: 10,
    minSpend: 30.00
  },
  {
    code: 'BEMVINDO',
    discountPercent: 15,
    minSpend: 50.00
  },
  {
    code: 'AMORDEBOLO',
    discountPercent: 20,
    minSpend: 100.00
  },
  {
    code: 'FESTAVIP',
    discountPercent: 25,
    minSpend: 180.00
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Camila Vasconcelos',
    role: 'Aniversariante',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    comment: 'O Bolo Vulcão de Ninho com Nutella foi a atração da minha festa! Super molhadinho, recheio na medida e entrega super pontual. Com certeza virei cliente fiel.',
    productName: 'Bolo Vulcão Ninho com Nutella'
  },
  {
    id: 't-2',
    name: 'Rodrigo Alencar',
    role: 'Cliente frequente',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    comment: 'Os brigadeiros de chocolate belga são surreais de tão bons. A textura é macia e não é aquele doce enjoativo. O atendimento no WhatsApp foi impecável!',
    productName: 'Caixa 12 Brigadeiros Belgas'
  },
  {
    id: 't-3',
    name: 'Juliana Mendes',
    role: 'Mãe da Laura',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5,
    comment: 'Pedi o Kit Festa completo pro aniversário de 5 anos da minha filha. Os salgadinhos estavam crocantes e o bolo Red Velvet estava divino. Recomendo de olhos fechados!',
    productName: 'Kit Festa Doce Sonho'
  }
];
