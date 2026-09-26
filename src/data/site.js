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
    image: 'images/hero-laptop.png',
    features: ['Market-structure workflow', 'Multi-timeframe analysis', 'Clear visual signals', 'Built for cTrader'],
    delivery: { type: 'cTrader Store', label: 'Distributed through cTrader Store', url: '' }
  },
  {
    slug: 'risk-calculator', name: 'Trade Avata Risk Calculator', type: 'Tool', category: 'Trading Tools',
    platforms: ['Web', 'Mobile'], price: 0, priceLabel: 'Free', showPrice: true,
    availability: 'Available', visible: true, featured: true,
    short: 'Plan position size and risk before entering a trade.',
    description: 'A compact position-sizing and risk planning utility designed for quick decisions before an entry.',
    image: 'images/hero-laptop.png',
    features: ['Risk percentage', 'Position sizing', 'Risk/reward planning', 'Mobile friendly'],
    delivery: { type: 'Web tool', label: 'Runs directly in Trade Avata', url: '/tools/position-sizing/' }
  },
  {
    slug: 'market-replay', name: 'Trade Avata Market Replay', type: 'Application', category: 'Trading Applications',
    platforms: ['Windows', 'macOS'], price: 0, priceLabel: 'Planned', showPrice: false,
    availability: 'Planned', visible: true, featured: true,
    short: 'A future replay workspace for disciplined chart review.',
    description: 'A future Trade Avata application for replaying market data, testing workflows and reviewing decisions.',
    image: 'images/hero-laptop.png',
    features: ['Replay workflow', 'Chart review', 'Trading practice', 'Future multi-platform support'],
    delivery: { type: 'External download', label: 'Installer will be delivered outside the website', url: '' }
  },
  {
    slug: 'trading-journal', name: 'Trade Avata Trading Journal', type: 'Application', category: 'Trading Applications',
    platforms: ['Web', 'Android', 'iOS'], price: 0, priceLabel: 'Planned', showPrice: false,
    availability: 'Planned', visible: true, featured: true,
    short: 'A future workspace for recording and reviewing trades.',
    description: 'A future journal for screenshots, notes, statistics and repeatable trade-review workflows.',
    image: 'images/hero-laptop.png',
    features: ['Trade records', 'Screenshots and notes', 'Performance summaries', 'Review workflow'],
    delivery: { type: 'Application', label: 'Delivered through the appropriate app channel', url: '' }
  },
  {
    slug: 'hidden-example', name: 'Hidden Product Example', type: 'Resource', category: 'Resources',
    platforms: ['Web'], price: 25000, priceLabel: '₦25,000', showPrice: false,
    availability: 'Draft', visible: false, featured: false,
    short: 'A prototype showing that backend controls can hide products without deleting them.',
    description: 'This item is intentionally hidden from the public catalogue to demonstrate the future admin visibility model.',
    image: 'images/hero-laptop.png', features: ['Hidden from catalogue'],
    delivery: { type: 'Managed resource', label: 'Delivery method controlled by admin', url: '' }
  }
];

export const courses = [
  {
    slug: 'trading-for-complete-beginners', title: 'Trading for Complete Beginners', level: 'Beginner', modules: 12, lessons: 60, duration: '4h 20m',
    description: 'Start from zero with market basics, charts, orders, risk, psychology and a structured first trading plan.',
    delivery: { type: 'Vimeo', label: 'Video lessons delivered through Vimeo' }
  },
  {
    slug: 'technical-analysis-foundations', title: 'Technical Analysis Foundations', level: 'Beginner → Intermediate', modules: 8, lessons: 32, duration: '3h 10m',
    description: 'Build a structured framework for reading price, trends, levels, momentum and trade scenarios.',
    delivery: { type: 'Vimeo', label: 'Video lessons delivered through Vimeo' }
  },
  {
    slug: 'risk-management', title: 'Risk Management', level: 'All levels', modules: 6, lessons: 24, duration: '2h 05m',
    description: 'Learn position sizing, risk limits, drawdown and risk/reward planning.',
    delivery: { type: 'Vimeo', label: 'Video lessons delivered through Vimeo' }
  }
];

export const toolCategories = [
  { slug: 'calculate', name: 'Calculate', description: 'Quick planning and risk utilities.', tools: [
    'position-sizing', 'risk-reward', 'pnl', 'compounding', 'drawdown-recovery', 'margin', 'pip-value', 'lot-size'
  ]},
  { slug: 'market', name: 'Market', description: 'Live market context from established providers.', tools: [
    'economic-calendar', 'forex-heatmap', 'crypto-heatmap', 'correlation', 'technical-analysis', 'market-overview'
  ]},
  { slug: 'timing', name: 'Timing', description: 'Sessions, overlaps and trading windows.', tools: [
    'session-clock', 'market-sessions'
  ]},
  { slug: 'plan', name: 'Plan & Track', description: 'Prepare, document and review trades.', tools: [
    'trade-planner', 'trade-checklist', 'expectancy', 'trade-journal'
  ]}
];

export const tools = [
  { slug: 'position-sizing', name: 'Position Size Calculator', category: 'Calculate', description: 'Calculate position size from account risk and stop distance.', ready: true, kind: 'position-sizing', popular: true },
  { slug: 'risk-reward', name: 'Risk/Reward Calculator', category: 'Calculate', description: 'Plan a trade around risk, target and reward multiple.', ready: true, kind: 'risk-reward', popular: true },
  { slug: 'pnl', name: 'Profit/Loss Calculator', category: 'Calculate', description: 'Estimate potential profit or loss before entry.', ready: true, kind: 'pnl' },
  { slug: 'compounding', name: 'Account Growth Calculator', category: 'Calculate', description: 'Model account growth using a starting balance and recurring return.', ready: true, kind: 'compounding' },
  { slug: 'drawdown-recovery', name: 'Drawdown & Recovery', category: 'Calculate', description: 'See the return required to recover from a drawdown.', ready: true, kind: 'drawdown' },
  { slug: 'margin', name: 'Margin & Leverage Calculator', category: 'Calculate', description: 'Estimate position value and margin from leverage.', ready: true, kind: 'margin' },
  { slug: 'pip-value', name: 'Pip Value Calculator', category: 'Calculate', description: 'Estimate pip value using your position size and pip value input.', ready: true, kind: 'pip-value' },
  { slug: 'lot-size', name: 'Lot Size Converter', category: 'Calculate', description: 'Convert common lot-size formats quickly.', ready: true, kind: 'lot-size' },
  { slug: 'economic-calendar', name: 'Economic Calendar', category: 'Market', description: 'Filter scheduled economic events by importance and currency.', ready: true, kind: 'tradingview-calendar', provider: 'TradingView', popular: true },
  { slug: 'forex-heatmap', name: 'Forex Heatmap', category: 'Market', description: 'Compare currency strength and cross-rate movement at a glance.', ready: true, kind: 'forex-table', provider: 'TradingView', popular: true },
  { slug: 'crypto-heatmap', name: 'Crypto Heatmap', category: 'Market', description: 'Scan crypto market performance visually.', ready: true, kind: 'external', provider: 'TradingView' },
  { slug: 'correlation', name: 'Forex Correlation', category: 'Market', description: 'Compare how currency pairs move relative to each other.', ready: true, kind: 'external', provider: 'Myfxbook' },
  { slug: 'technical-analysis', name: 'Technical Analysis Gauge', category: 'Market', description: 'View a technical-analysis summary for a selected market and timeframe.', ready: true, kind: 'technical-analysis', provider: 'TradingView', popular: true },
  { slug: 'market-overview', name: 'Market Overview', category: 'Market', description: 'Keep key indices, futures, bonds and forex markets in one view.', ready: true, kind: 'market-data', provider: 'TradingView' },
  { slug: 'session-clock', name: 'Market Session Clock', category: 'Timing', description: 'See major trading sessions and overlaps across the day.', ready: true, kind: 'session-clock', popular: true },
  { slug: 'market-sessions', name: 'Trading Hours', category: 'Timing', description: 'Understand when major markets open, overlap and close.', ready: true, kind: 'session-clock' },
  { slug: 'trade-planner', name: 'Trade Planner', category: 'Plan & Track', description: 'Bring entry, stop, target and risk details together before a trade.', ready: true, kind: 'trade-planner', popular: true },
  { slug: 'trade-checklist', name: 'Trade Checklist', category: 'Plan & Track', description: 'Run through a simple pre-trade checklist in your browser.', ready: true, kind: 'checklist' },
  { slug: 'expectancy', name: 'Expectancy Calculator', category: 'Plan & Track', description: 'Estimate expected value from win rate, average win and average loss.', ready: true, kind: 'expectancy' },
  { slug: 'trade-journal', name: 'Trade Journal', category: 'Plan & Track', description: 'A lightweight browser-first journal shell for recording trade notes.', ready: true, kind: 'journal' }
];

export const faqs = [
  ['What is Trade Avata?', 'Trade Avata is a trading technology and products company building tools, applications, education and practical solutions.'],
  ['Do I need an account?', 'Some public resources can be used without an account. Protected products and learning features can require an account.'],
  ['Does Trade Avata store large course videos on the website?', 'No. The architecture is designed to keep the website lightweight. Video courses can be delivered through Vimeo, while the Trade Avata platform manages course structure, access and progress.'],
  ['Where will Trade Avata software downloads live?', 'Large installers such as a future Trade Avata Replay build can be delivered from external or protected file storage instead of being bundled into the website.'],
  ['Can products use external marketplaces?', 'Yes. Products can link to specialist platforms such as cTrader Store or MQL5 Market where those platforms are the appropriate distribution channel.'],
  ['Can products be hidden?', 'Yes. The production admin system will support independent visibility controls so a product can remain stored while being hidden publicly.'],
  ['Will prices always be visible?', 'No. The planned product model supports a separate price-visibility control, so an administrator can hide a price without removing the product.'],
  ['What platforms will Trade Avata support?', 'Products can support different platforms, including web, cTrader, MT5, Windows, macOS, Android and iOS where appropriate.']
];

export const toolMap = Object.fromEntries(tools.map(tool => [tool.slug, tool]));
