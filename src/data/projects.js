import project1 from '../assets/bookShop.png';
import project2 from '../assets/project-2.png';
import project3 from '../assets/project-3.png';
import project4 from '../assets/project-4.png';

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
    id: 'luxury-fashion', 
    title: 'Luxury Fashion Editorial', 
    author: 'Vogue Lab', 
    image: project2, 
    label: 'label.branding', 
    link: '#',
    category: {
      'pt-br': 'Moda & Beleza',
      'en': 'Fashion & Beauty'
    },
    date: 'Mar 2026',
    description: {
      'pt-br': 'Uma vitrine de moda de vanguarda que mistura visuais de alto contraste com narrativa interativa.',
      'en': 'An avant-garde fashion showcase blending high-contrast visuals with interactive storytelling.'
    },
    tags: [
      { label: 'Vue.js' },
      { label: 'GSAP' },
      { label: 'Three.js' },
      { label: 'Editorial' },
      { label: 'High-Contrast' }
    ]
  },
  { 
    id: 'scandinavian-furniture', 
    title: 'Scandinavian Furniture', 
    author: 'Nordic Design', 
    image: project3, 
    label: 'label.ecommerce', 
    link: '#',
    category: {
      'pt-br': 'Interiores',
      'en': 'Interiors'
    },
    date: 'Feb 2026',
    description: {
      'pt-br': 'Limpo, funcional e bonito. Um catálogo desenhado para combinar com os princípios do mobiliário nórdico.',
      'en': 'Clean, functional, and beautiful. A catalogue designed to match the principles of Nordic furniture.'
    },
    tags: [
      { label: 'Vue.js' },
      { label: 'Tailwind' },
      { label: 'Vite' },
      { label: 'E-commerce' },
      { label: 'Minimal' }
    ]
  },
  { 
    id: 'creative-agency', 
    title: 'Creative Agency Portfolio', 
    author: 'Pixel Perfect', 
    image: project4, 
    label: 'label.website', 
    link: '#',
    category: {
      'pt-br': 'Corporativo',
      'en': 'Corporate'
    },
    date: 'Jan 2026',
    description: {
      'pt-br': 'Um portfólio ousado e futurista para uma agência criativa focada no digital.',
      'en': 'A bold, futuristic portfolio for a digital-first creative agency.'
    },
    tags: [
      { label: 'Next.js' },
      { label: 'Framer Motion' },
      { label: 'Figma' },
      { label: 'UI/UX' },
      { label: 'Product Design' }
    ]
  }
];
