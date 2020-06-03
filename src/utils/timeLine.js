import moment from 'moment';

/**
 * 
 * @param {*} date 
 * @param {*} format 
 */
export function localUtc(date = new Date(), format = 'YYYY-MM-DD') {
    return moment.utc(date).local().format(format)
}
/**
 * 获取前某一天的时间
 * @param {*} day
 */
export function timeLine(day) {
    return moment().subtract('days', day).format('YYYY-MM-DD');
}