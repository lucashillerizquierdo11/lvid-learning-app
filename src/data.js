import { sport } from './sportData';
import { film } from './filmData';
import { investering } from './investeringData';
import { politik } from './politikData';
import { lvid } from './lvidData';

export const categories = {
  musik: { name: 'Musik', color: '#a78bfa' },
  film,
  sport: { name: 'Sport', color: '#fb923c' },
  lvid: { name: 'Lvid', color: '#60a5fa' },
  investering: { name: 'Investering', color: '#a3e635' },
  studier: { name: 'Studier', color: '#fbbf24' },
  politik: { name: 'Politik', color: '#818cf8' },
  kemi: { name: 'Kemi', color: '#2dd4bf' },
  biologi: { name: 'Biologi', color: '#f87171' },
  vokabular: { name: 'Vokabulär', color: '#f472b6' },
  historia: { name: 'Historia', color: '#c084fc' },
};

export const subcatMap = {
  musik: ['Artister', 'Album', 'Genrer'],
  film: ['Handlingar', 'Citat', 'Karaktärer', 'Skådespelare'],
  sport: ['Basket', 'Golf', 'Positioner', 'Stjärnspelare (färskvara)', 'Allsvenskan', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Hammarby (trupp)'],
  lvid: [
    'AI Fundamentals',
    'Supervised Learning',
    'Unsupervised Learning',
    'Reinforcement Learning',
    'Neural Network Architectures',
    'Large Language Models',
    'Training & Optimization',
    'Regularization & Overfitting',
    'Evaluation Metrics',
    'Computer Vision',
    'Natural Language Processing',
    'Advanced Concepts',
    'Production & MLOps',
    'Ethics & Safety',
    'Emerging Trends'
  ],
  investering: ['Grundläggande', 'Värdering', 'Lönsamhet', 'Risk', 'Teknisk', 'Case'],
  studier: ['Tekniker', 'Anteckningar'],
  politik: ['Huvudstäder', 'Valutor', 'Språk', 'Statsskick', 'Sevärdheter', 'Ledare (färskvara)'],
  kemi: ['Grundämnen', 'Formler', 'Reaktioner'],
  biologi: ['Cellbiologi', 'Genetik', 'Ekologi'],
  vokabular: ['Engelska', 'Franska', 'Spanska'],
  historia: ['Antiken', 'Medeltiden', 'Modern'],
};

export const initialData = {
  sport,
  film,
  investering,
  politik,
  lvid,
  kemi: {
    'Grundämnen': [
      { title: 'H', definition: 'Väte – atomnummer 1, lättaste elementet', difficulty: 'lätt' },
      { title: 'O', definition: 'Syre – atomnummer 8, essentiellt för andning', difficulty: 'lätt' },
      { title: 'C', definition: 'Kol – atomnummer 6, bas för all organisk kemi', difficulty: 'medel' },
    ],
    'Formler': [
      { title: 'H2O', definition: 'Vatten – två väte och en syreatom', difficulty: 'lätt' },
      { title: 'NaCl', definition: 'Natriumklorid (salt) – jonisk förening', difficulty: 'medel' },
    ],
  },
  biologi: {
    'Cellbiologi': [
      { title: 'Mitokondrie', definition: 'Cellens kraftverk – producerar ATP för energi', difficulty: 'medel' },
      { title: 'Ribosomer', definition: 'Proteinsyntes-maskineri i cellen', difficulty: 'medel' },
    ],
  },
};
