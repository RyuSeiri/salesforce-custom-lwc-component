/**
 * デートフォマート
 * @param {Date} date date
 * @param {string} fmt format
 * @returns {string} StringDate
 */
export const dateFormat = (date, fmt = 'YYYY/mm/dd') => {
    let ret;
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 時
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
    };
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
    };
    return fmt;
}

/**
 * Dateかを判断する
 * @param {*} value 
 * @returns 
 */
export const isDate = (value) => {
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
}


/**
 * Dateへ変換
 * @param {*} value 
 * @returns 
 */
export const toDate = (value) => {
    let dateObj = value;
    if (!isDate(value) && (typeof value === 'string' || typeof value === 'number')) {
        dateObj = new Date(isFinite(value) ? parseInt(value, 10) : Date.parse(value));
    }
    return dateObj
}