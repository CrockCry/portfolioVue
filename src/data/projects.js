import project1 from '../assets/bookShop.png';
import project2 from '../assets/TradiPain.png';
import project3 from '../assets/portifolio.png';

export const projects = [
  {
    id: 'book-shop',
    title: 'Minimalist Book Shop',
    author: 'Pedro Vischi',
    image: project1,
    label: 'label.ecommerce',
    link: 'https://book-shop-two-sigma.vercel.app/',
    category: {
      'pt-br': 'E-commerce & Varejo',
      'en': 'E-commerce & Retail'
    },
    date: 'Apr 2026',
    description: {
      'pt-br': 'Uma experiência de livraria digital premium focada em design editorial e estética minimalista.',
      'en': 'A premium digital bookstore experience focused on editorial design and minimalist aesthetics.'
    },
    credits: [
      { name: 'Pedro Vischi', role: 'Design & Dev', avatar: '' }
    ],
    stats: {
      design: 8.5,
      usability: 9.0,
      creativity: 8.0,
      content: 7.5
    },
    features: [
      {
         title: { 'pt-br': 'Layout Editorial', 'en': 'Editorial Layout' },
         description: {
           'pt-br': 'Tipografia grande e espaços generosos para imitar uma revista física.',
           'en': 'Large typography and generous whitespace to mimic a physical magazine.'
         },
         image: project1
      },
      {
         title: { 'pt-br': 'Interações Fluidas', 'en': 'Smooth Interactions' },
         description: {
           'pt-br': 'Transições suaves entre estados usando GSAP e Lenis.',
           'en': 'Fluid transitions between states using GSAP and Lenis.'
         },
         image: project1
      }
    ],
    tags: [
      { label: 'HTML5' },
      { label: 'CSS3' },
      { label: 'Vanilla JS' },
      { label: 'Vite' },
      { label: 'Clean' },
      { label: 'Minimalist' },
      { label: 'E-commerce' },
      { label: 'Figma' }
    ]
  },
  {
    id: 'trad-pain',
    title: 'Os Tradicionais Hub',
    author: 'Pedro Vischi',
    image: project2,
    label: 'label.website',
    link: 'https://trad-pain.vercel.app/',
    category: {
      'pt-br': 'E-sports & Comunidades',
      'en': 'E-sports & Communities'
    },
    date: 'Mar 2026',
    description: {
      'pt-br': 'Um portal completo para a comunidade da paiN Gaming, integrando estatísticas em tempo real, gestão de elenco e uma experiência de torcida engajadora.',
      'en': 'A complete portal for the paiN Gaming community, integrating real-time stats, roster management, and an engaging fan experience.'
    },
    credits: [
      { name: 'Pedro Vischi', role: 'Full Stack Dev', avatar: '' }
    ],
    stats: {
      integration: 9.5,
      performance: 8.8,
      community: 9.2,
      backend: 9.0
    },
    features: [
      {
        title: { 'pt-br': 'Integração Leaguepedia', 'en': 'Leaguepedia Integration' },
        description: {
          'pt-br': 'Consumo automatizado de dados de partidas e jogadores via API externa.',
          'en': 'Automated consumption of match and player data via external API.'
        },
        image: project2
      },
      {
        title: { 'pt-br': 'Painel Administrativo', 'en': 'Admin Dashboard' },
        description: {
          'pt-br': 'Gestão dinâmica de conteúdo com Supabase e sistema de Drag and Drop.',
          'en': 'Dynamic content management with Supabase and Drag and Drop system.'
        },
        image: project2
      }
    ],
    tags: [
      { label: 'React' },
      { label: 'Tailwind CSS' },
      { label: 'Express' },
      { label: 'Supabase' },
      { label: 'REST API' },
      { label: 'Cloudinary' },
      { label: 'DnD Kit' }
    ]
  },
  {
    id: 'portfolio-v3',
    title: 'Minimalist Portfolio V3',
    author: 'Pedro Vischi',
    image: project3,
    label: 'label.website',
    link: 'https://portfolio-vue-one-nu.vercel.app/',
    category: {
      'pt-br': 'Identidade Digital',
      'en': 'Digital Identity'
    },
    date: 'Apr 2026',
    description: {
      'pt-br': 'Um portfólio de alto nível focado em performance e storytelling visual, utilizando Vue 3, GSAP para animações e Lenis para scroll suave.',
      'en': 'A high-level portfolio focused on performance and visual storytelling, using Vue 3, GSAP for animations, and Lenis for smooth scrolling.'
    },
    tags: [
      { label: 'Vue 3' },
      { label: 'GSAP' },
      { label: 'Lenis' },
      { label: 'i18n' },
      { label: 'SPA' },
      { label: 'Editorial' }
    ]
  }
];
