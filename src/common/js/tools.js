import {EMOJI_RULE} from './emoji-data'
import {HOST}  from './config'


export function removeArrayelement(arr, el) {
    let index = arr.indexOf(el)
    if (index==-1) return arr;
    arr.splice(index, 1)
}

export function textareaFormat(val) {
    return val.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s+/g, '  ');
    // return val
}

export function textUnformat(val) {
    return val.replace( /<br\s*\/?>/gi,"\r\n" )
}

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "D+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
   }; 
   if(/(Y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

export function getMonthDays(month) {       //获取每月总天数
    const date = new Date()
    let year = date.getFullYear()
    let d = new Date(year, month, 0) 
    return d.getDate()
}


//字符数计算
export function calcStrLength(str) {
    const reg = /[\u4e00-\u9fa5]{1}/g,             //中文
        otherReg = /\w{1}/g;                      //非中文

    let length,
        resultCn = str.match(reg),
        resultEn = str.match(otherReg);

    let cn = resultCn ?　resultCn.length*2　: 0
    let nonCn = resultEn ? resultEn.length : 0

    return cn + nonCn
}




//时间戳转换日期
export function formatDate (time, fmt) {
    const date = new Date(time*1000);    //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};

export function postTime(time) {
    let now = new Date();
    let timeStamp = new Date(now.setHours(0, 0, 0, 0)) / 1000,
        fmt = "MM-dd";

    if (parseInt(time)> timeStamp) {    //当天 取日期格式为 hh:mm:ss
        fmt = "hh:mm:ss"
    } else if ( now.getFullYear() < (new Date(time*1000)).getFullYear() ) {
        fmt = "yyyy-MM-dd"      //时间戳日期不为今年时
    }
    return formatDate(time, fmt);
}


export function formateEmoji(html) {
    if (html) {
        return html.replace(/:[a-z]+:/g, function (word) {
            let src = EMOJI_RULE[word]
            if (src) {
                return `<img class="tiny-emoji" src="${HOST}/static/emoji/${src}"/>`
            } else {
                return word
            }
        })
    }
}