export const site = {
  name: 'Trade Avata',
  tagline: 'Trade Simple.',
  description: 'Trade Avata builds trading technology, products, tools, applications, education and solutions that make trading simpler.'
};

export const products = [
  {
    slug: 'goldhunter', name: 'GoldHunter', type: 'Indicator', category: 'Indicators',
    platforms: ['cTrader'], price: 0, priceLabel: 'Coming soon', showPrice: true,
    availability: 'Coming Soon', visible: true, featured: true,
    short: 'A focused market-structure and gold analysis tool for cTrader.',
    description: 'GoldHunter is designed around structured analysis, cleaner decision-making and a focused workflow for gold-market traders.',
    image: '/trade-avata-platform/images/hero-laptop.png',
    features: ['Market-structure workflow', 'Multi-timeframe analysis', 'Clear visual signals', 'Built for cTrader']
  },
  {
    slug: 'risk-calculator', name: 'Trade Avata Risk Calculator', type: 'Tool', category: 'Trading Tools',
    platforms: ['Web', 'Mobile'], price: 0, priceLabel: 'Free', showPrice: true,
    availability: 'Available', visible: true, featured: true,
    short: 'Plan position size and risk before entering a trade.',
    description: 'A compact position-sizing and risk planning utility designed for quick decisions before an entry.',
    image: '/trade-avata-platform/images/hero-laptop.png',
    features: ['Risk percentage', 'Position sizing', 'Risk/reward planning', 'Mobile friendly']
  },
  {
    slug: 'market-replay', name: 'Trade Avata Market Replay', type: 'Application', category: 'Trading Applications',
    platforms: ['Web', 'Windows', 'macOS'], price: 0, priceLabel: 'Planned', showPrice: false,
    availability: 'Planned', visible: true, featured: true,
    short: 'A future replay workspace for disciplined chart review.',
    description: 'A future Trade Avata application for replaying market data, testing workflows and reviewing decisions.',
    image: '/trade-avata-platform/images/hero-laptop.png',
    features: ['Replay workflow', 'Chart review', 'Trading practice', 'Future multi-platform support']
  },
  {
    slug: 'trading-journal', name: 'Trade Avata Trading Journal', type: 'Application', category: 'Trading Applications',
    platforms: ['Web', 'Android', 'iOS'], price: 0, priceLabel: 'Planned', showPrice: false,
    availability: 'Planned', visible: true, featured: true,
    short: 'A future workspace for recording and reviewing trades.',
    description: 'A future journal for screenshots, notes, statistics and repeatable trade-review workflows.',
    image: '/trade-avata-platform/images/hero-laptop.png',
    features: ['Trade records', 'Screenshots and notes', 'Performance summaries', 'Review workflow']
  },
  {
    slug: 'hidden-example', name: 'Hidden Product Example', type: 'Resource', category: 'Resources',
    platforms: ['Web'], price: 25000, priceLabel: '₦25,000', showPrice: false,
    availability: 'Draft', visible: false, featured: false,
    short: 'A prototype showing that backend controls can hide products without deleting them.',
    description: 'This item is intentionally hidden from the public catalogue to demonstrate the future admin visibility model.',
    image: '/trade-avata-platform/images/hero-laptop.png', features: ['Hidden from catalogue']
  }
];


export const courses = [
  {
    slug: 'trading-for-complete-beginners',
    title: 'Trading for Complete Beginners',
    level: 'Beginner',
    modules: 12,
    lessons: 60,
    duration: '4h 20m',
    description: 'Start from zero with market basics, charts, orders, risk, psychology and a structured first trading plan.'
  },
  {
    slug: 'technical-analysis-foundations',
    title: 'Technical Analysis Foundations',
    level: 'Beginner → Intermediate',
    modules: 8,
    lessons: 32,
    duration: '3h 10m',
    description: 'Build a structured framework for reading price, trends, levels, momentum and trade scenarios.'
  },
  {
    slug: 'risk-management',
    title: 'Risk Management',
    level: 'All levels',
    modules: 6,
    lessons: 24,
    duration: '2h 05m',
    description: 'Learn position sizing, risk limits, drawdown and risk/reward planning.'
  }
];

export const tools = [
  ['position-sizing', 'Position Size Calculator', 'Calculate a position size from account risk and stop distance.'],
  ['risk-reward', 'Risk/Reward Calculator', 'Plan a trade around risk, target and reward multiples.'],
  ['pip-value', 'Pip Value Calculator', 'Estimate pip value for supported trading instruments.'],
  ['margin', 'Margin Calculator', 'Estimate required margin for a trading position.'],
  ['pnl', 'P&L Calculator', 'Estimate potential profit and loss before entry.'],
  ['lot-size', 'Lot Size Converter', 'Convert position sizes between common formats.']
].map(([slug, name, description]) => ({ slug, name, description }));

export const faqs = [
  ['What is Trade Avata?', 'Trade Avata is a trading technology and products company building tools, applications, education and practical solutions.'],
  ['Do I need an account?', 'Some public resources can be used without an account. Protected products and learning features can require an account.'],
  ['Can products be hidden?', 'Yes. The production admin system will support independent visibility controls so a product can remain stored while being hidden publicly.'],
  ['Will prices always be visible?', 'No. The planned product model supports a separate price-visibility control, so an administrator can hide a price without removing the product.'],
  ['What platforms will Trade Avata support?', 'Products can support different platforms, including web, cTrader, MT5, Windows, macOS, Android and iOS where appropriate.']
];
