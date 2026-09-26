const approx = (a,b,t=1e-8) => Math.abs(a-b) <= t;
const cases = [
  ['position sizing', (100000*1/100)/(100*100), 0.1],
  ['risk reward', Math.abs(3650-3500)/Math.abs(3500-3450), 3],
  ['pnl long', (3600-3500)*1, 100],
  ['pnl short', (3500-3600)*1, -100],
  ['compound', 100000*Math.pow(1.05,12), 179585.632602],
  ['drawdown recovery', (1/(1-.2)-1)*100, 25],
  ['margin', (3500*1)/100, 35],
  ['pip value', 10000*.0001*1, 1],
  ['lot conversion', 10000/100000, .1],
  ['expectancy', .5*2-.5*1, .5]
];
const failures = cases.filter(([,got,want]) => !approx(got,want,1e-5));
if (failures.length) {
  console.error('Tool formula verification failed:');
  for (const [name,got,want] of failures) console.error(`- ${name}: got ${got}, expected ${want}`);
  process.exit(1);
}
console.log(`Tool formula verification passed for ${cases.length} cases.`);
