export function removeArrayelement(arr, el) {
    let index = arr.indexOf(el)
    if (index==-1) return arr;
    arr.splice(index, 1)
}

export function textareaFormat(val) {
    return val.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s+/g, '  ');
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

export function getMonthDays(month) {
    const date = new Date()
    let year = date.getFullYear()
    let d = new Date(year, month, 0) 
    return d.getDate()
}

