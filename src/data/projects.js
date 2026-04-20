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
    label: 'E-COMMERCE',
    link: 'https://book-shop-two-sigma.vercel.app/',
    category: 'E-commerce & Retail',
    date: 'Apr 2026',
    description: 'A premium digital bookstore experience focused on editorial design and minimalist aesthetics.',
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
        title: 'Editorial Layout',
        description: 'Large typography and generous whitespace to mimic a physical magazine.',
        image: project1
      },
      {
        title: 'Smooth Interactions',
        description: 'Fluid transitions between states using GSAP and Lenis.',
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
    label: 'BRANDING',
    link: '#',
    category: 'Fashion & Beauty',
    date: 'Mar 2026',
    description: 'An avant-garde fashion showcase blending high-contrast visuals with interactive storytelling.',
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
    label: 'E-COMMERCE',
    link: '#',
    category: 'Interiors',
    date: 'Feb 2026',
    description: 'Clean, functional, and beautiful. A catalogue designed to match the principles of Nordic furniture.',
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
    label: 'WEBSITE',
    link: '#',
    category: 'Corporate',
    date: 'Jan 2026',
    description: 'A bold, futuristic portfolio for a digital-first creative agency.',
    tags: [
      { label: 'Next.js' },
      { label: 'Framer Motion' },
      { label: 'Figma' },
      { label: 'UI/UX' },
      { label: 'Product Design' }
    ]
  }
];
