export function dedupe(array) {
  return Array.from(new Set(array));
}

export function dedupeCraftList(array) {
  const orderIdList = [];
  array.map(item => orderIdList.push(item.orderid));
  const newOrderIdList = dedupe(orderIdList);
  const newArr = newOrderIdList.map(item => {
    return array.find(items => items.orderid === item);
  });
  return newArr;
}
