export function isInteger(number,toFixedNum = 2) {
    if(isNaN(number)) return number;
    if(Number.isInteger(number)) return number;
    return Number(number.toFixed(toFixedNum));
}