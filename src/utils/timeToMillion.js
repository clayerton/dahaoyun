import { formatMessage } from 'umi-plugin-react/locale';
/**
 * 
 * @param {*} params 
 * @param {*} flag 
 * @param {*} fromOrder 
 */
export function timeToMillion(params, flag, fromOrder) {
    let times;
    if(!!flag) {
        var nowTime = (new Date()).getTime();
        var lastTime = (new Date(params)).getTime();
        times = (nowTime - lastTime)/1000;
    }else {
        times = params;
    }
    if (times === 0 && !!fromOrder) return `0${formatMessage({id: 'second'})}`;
    if (times === 0) return `0${formatMessage({id: 'second'})}`;

    if (!times) return null;
    let day, hour, minute, endOutStr, second;
    if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        if (parseInt(day) != 0) {
            endOutStr = day + formatMessage({id: 'day'}) + hour + formatMessage({id: 'hour'}) + minute + formatMessage({id: 'minute'});
        } else {
            if(parseInt(hour) !=0) {
               endOutStr = hour + formatMessage({id: 'hour'}) + minute + formatMessage({id: 'minute'}) + second + formatMessage({id: 'second'});
            }else {
                if(parseInt(minute) !=0) {
                    endOutStr =  minute + formatMessage({id: 'minute'}) + second + formatMessage({id: 'second'});
                }else {
                    endOutStr =  second + formatMessage({id: 'second'});
                }
            }
        }
    } else {
        endOutStr = `0${formatMessage({id: 'second'})}`
    }
    return endOutStr
}