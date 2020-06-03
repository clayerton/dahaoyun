import { formatMessage } from 'umi-plugin-react/locale';
export function getValue(param, data = []) {
  let sizeObj = null;
  for (var key in data) {
    let index = data[key].hasOwnProperty('key');
    let newData = data[key];
    if (index && newData['key'] === param) {
      sizeObj = data[key].value;
    }
  }
  return sizeObj;
}

// 补全遍历数组
export function completionMap(prev, compLength) {
  if (!compLength || prev.length === 0) return [];
  let arr = [],
    length = prev.length;
  let line = Math.floor(compLength / length); //行数
  let remainder = compLength % length; //余数
  let remArray = prev.slice(0, remainder);
  for (let i = 0; i < line; i++) {
    arr.push(...prev);
  }
  if (remainder > 0) {
    arr.push(...remArray);
  }
  return arr;
}

// 过滤
export function parameterFilter(accArr, curArr) {
  return accArr.filter((v, i) => !curArr.includes(v['key']));
}

// 统一单位
const unitMap = {
  pc: formatMessage({ id: 'piece' }),
  pr: formatMessage({ id: 'pair' }),
  dp: formatMessage({ id: 'dozen-pair' }),
  m: formatMessage({ id: 'meter' }),
  yd: formatMessage({ id: 'yard' }),
};
export { unitMap };
