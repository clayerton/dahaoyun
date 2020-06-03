let unitLocal = localStorage.getItem('unit')
console.log(unitLocal, JSON.parse(unitLocal))
const unitInfo = unitLocal && JSON.parse(unitLocal);
export function unit(type) {
  const { name, factor } = unitInfo && unitInfo.filter(v => v.type === type)[0] || [];
  return `${factor}${name}`;
}
export function handleFactor(n, type) {
  const { name, factor } = unitInfo && unitInfo.filter(v => v.type === type)[0] || [];
  if (isNaN(n) || !n) return `0${name || ''}`;
  let num = Number(n / (factor || 1)).toFixed(0);
  return `${num}${name || ''}`;
}
export function handleData(n,ceil=0) {
  if (isNaN(n)) return 0;
  return Number(n).toFixed(ceil);
}
