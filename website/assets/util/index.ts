const ua = navigator.userAgent.toLowerCase();
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua);

/**
 * 将时间格式化
 * @param {Date | String | Number} date 时间 
 * @param {String} format 格式，默认为 yyyy-MM-dd
 * @returns {* | XML | string | void} 
 */
export const formatTime = (date: Date | string | number, format: string = 'yyyy-MM-dd') => {
    if (!date) return ''
    if (!(date instanceof Date)) {
        if (typeof date === 'number') {
            date = new Date(parseInt(String(date), 10))
        } else {
            date = new Date(date)
        }
    }
    const map: Record<string, number> = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        q: Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    format = format.replace(/([yMdHhmsqS])+/g, (all, t) => {
        let v = String(map[t])
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v
                v = v.substr(v.length - 2)
            }
            return v
        } else if (t === 'y') {
            return ((date as Date).getFullYear() + '').substr(4 - all.length)
        }
        return all
    })
    return format
}

export { isMobile };
