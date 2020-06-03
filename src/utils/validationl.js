export function naturalNumber(num) {
  if (/^(0|[1-9]\d*)$/.test(num)) return true;
  return false;
}

export function positiveInteger(num) {
  if (/^[1-9]\d*$/.test(num)) return true;
  return false;
}
