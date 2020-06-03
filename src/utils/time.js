import { formatMessage } from 'umi/locale';

// 转换时间
export function getHours(time) {
    const hours = parseInt((time % (60 * 60 * 24)) / (60 * 60));
    return hours;
};

export function getMinutes(time) {
    const minutes = parseInt((time % (60 * 60)) / 60);
    return minutes;
};

export function getSeconds(time) {
    const seconds = parseInt(time % 60);
    return seconds;
};

export function formatDuring(time) {
    const hours = getHours(time);
    const minutes = getMinutes(time);
    const seconds = getSeconds(time);
    if(!!hours) return hours + 'h ' + minutes + 'min ' + seconds + 's';
    if(!!minutes) return minutes + 'min ' + seconds + 's';
    return seconds + 's';
};