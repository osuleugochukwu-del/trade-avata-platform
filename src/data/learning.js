export const sampleLessons = {
  'trading-for-complete-beginners': {
    slug: 'what-is-a-market',
    title: 'What Is a Market?',
    moduleTitle: 'Module 1 — Trading Foundations',
    public: true,
    readTime: '6 min read',
    summary: 'A simple introduction to what traders are actually participating in when they buy and sell financial instruments.',
    blocks: [
      { type: 'paragraph', text: 'A financial market is a place or system where buyers and sellers exchange an asset. As a trader, your job is not to predict every movement. Your job is to understand the market you are trading, define your risk, and make decisions from a repeatable process.' },
      { type: 'heading', level: 2, text: 'Price is the meeting point between buyers and sellers' },
      { type: 'paragraph', text: 'When buyers are willing to pay more aggressively than sellers are willing to offer, price can move higher. When selling pressure dominates, price can move lower. A chart is simply a visual record of those changes over time.' },
      { type: 'example', title: 'Simple example', text: 'Imagine a currency pair trading around 1.1000. If buyers continue accepting higher offers, price might move toward 1.1050. If sellers become more aggressive, price might instead move toward 1.0950. The important point is that the chart records the result of that interaction.' },
      { type: 'callout', tone: 'important', title: 'Keep it simple', text: 'A market is not a machine that owes you a trade. Your process should start with context, risk and a defined plan.' },
      { type: 'takeaway', title: 'Key takeaway', text: 'Price records the interaction between buyers and sellers. Your process determines how you respond to it.' },
      { type: 'orderedList', items: ['Choose the market and timeframe', 'Define the setup and invalidation point', 'Calculate the position size from the risk'], title: 'A simple sequence' },
      { type: 'warning', title: 'Risk reminder', text: 'Examples are educational. Real trading results can differ because of spread, slippage, fees and market conditions.' },
      { type: 'chart', url: 'https://your-image-host.example/market-structure-chart.webp', alt: 'Example market structure chart', caption: 'Replace this with your hosted chart image.' },
      { type: 'resource', title: 'Related resource', text: 'Use the position size calculator to turn a risk amount into a position size.', url: '/tools/position-size/' },
      { type: 'quiz', question: 'What does a chart primarily record?', options: ['Price changes over time', 'A guaranteed future price', "A trader's profit"], answerIndex: 0 },
      { type: 'heading', level: 2, text: 'What you will learn next' },
      { type: 'list', items: ['How price is displayed on a chart', 'What a trading order actually does', 'Why risk should be defined before entry', 'How to build a simple repeatable trading plan'] },
      { type: 'divider' },
      { type: 'paragraph', text: 'This sample lesson demonstrates the Trade Avata readable-learning format. Full protected lessons are designed to be stored in the learning backend and can use external image, chart and video URLs without making the website heavy.' }
    ]
  },
  'technical-analysis-foundations': {
    slug: 'reading-price',
    title: 'Reading Price Without Overcomplicating It',
    moduleTitle: 'Module 1 — Price Foundations',
    public: true,
    readTime: '5 min read',
    summary: 'A short introduction to reading price movement through structure, levels and context.',
    blocks: [
      { type: 'paragraph', text: 'Technical analysis begins with observation. Before adding indicators, learn to identify what price is doing: moving, pausing, rejecting an area, or breaking a previous structure.' },
      { type: 'heading', level: 2, text: 'Start with context' },
      { type: 'paragraph', text: 'A single candle rarely tells the whole story. The surrounding sequence gives the move meaning. Look at the broader direction, important areas and the timeframe you are using.' },
      { type: 'callout', tone: 'tip', title: 'A useful habit', text: 'Ask “What is price doing here?” before asking “What indicator should I use?”' },
      { type: 'list', items: ['Identify the timeframe', 'Mark obvious swing areas', 'Observe whether price is trending or ranging', 'Only then consider an entry idea'] }
    ]
  },
  'risk-management': {
    slug: 'risk-before-entry',
    title: 'Risk Comes Before the Entry',
    moduleTitle: 'Module 1 — Risk Foundations',
    public: true,
    readTime: '5 min read',
    summary: 'Why the amount you can lose should be defined before the trade is opened.',
    blocks: [
      { type: 'paragraph', text: 'Risk management is the part of trading that protects your ability to keep participating. A setup can be technically correct and still produce a losing trade. Your plan has to account for that possibility.' },
      { type: 'example', title: 'Simple risk example', text: 'If an account is ₦100,000 and the planned risk is 1%, the maximum planned loss is ₦1,000 before costs and execution differences. Position size should be calculated from that risk amount and the stop distance.' },
      { type: 'callout', tone: 'important', title: 'Define the loss first', text: 'Choose the invalidation point and acceptable loss before choosing the position size.' }
    ]
  }
};

export function getSampleLesson(courseSlug) {
  return sampleLessons[courseSlug] || null;
}
