/**
 * 平铺对象
 * @param {*} msg 目标数组
 * @param {*} crumb 
 */
export function flagObj(msg, crumb = []) {
    let r = {};
    const keys = Object.keys(msg);
    keys.forEach( i=>{
        crumb.push(i);
        if(typeof msg[i] === 'string') {
            r[crumb.join('.')] = msg[i];
        }else {
            Object.assign(r, flagObj(msg[i], crumb))
        }
        crumb.pop();
    })
    return r;
}