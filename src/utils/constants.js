import { formatMessage } from 'umi-plugin-react/locale';
import { unitMap } from '@/utils/parameter';

const UNITS = {
  piece: formatMessage({ id: 'piece' }),
  pair: formatMessage({ id: 'pair' }),
  'dozen-pair': formatMessage({ id: 'dozen-pair' }),
  meter: formatMessage({ id: 'meter' }),
  yard: formatMessage({ id: 'yard' }),
};

export const parseUnit = function(unit) {
  if (!unit) return null;
  var u = null;
  try {
    u = unitMap[unit];
  } catch (e) {}
  return u;
};
