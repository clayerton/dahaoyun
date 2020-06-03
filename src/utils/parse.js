export function parseArrayToParams(key, array) {
  try {
    let str = '?';
    array &&
      array.map(v => {
        str += `${key}=${v}&`;
      });
    str = str.substring(0, str.length - 1);
    if (__DEV__) console.log('Parse success:', str);
    return str;
  } catch (e) {
    if (__DEV__) console.log('Parse Array To Params has error:', e);
  }
  return '';
}

export function parseFilters(args) {
  if (!args) {
    return {};
  }
  Object.keys(args).map(current => (args[current] = args[current][0]));
  return args;
}


export function calcProgress(current, max) {
  if (!current || !max || !isNaturalNumberInput(current) || !isNaturalNumberInput(max)) return 0;
  const integer = Math.round((current / max) * 100);
  if (integer > 100) return 100;
  return integer;
}

export const isNaturalNumberInput = function (str) {
  if (!isNaN(Number(str)) && Number(str) >= 0) {
    return true;
  }
  return false;
};