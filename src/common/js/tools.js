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

export function getMonthDays(month) {       //获取每月总天数
    const date = new Date()
    let year = date.getFullYear()
    let d = new Date(year, month, 0) 
    return d.getDate()
}

export function transformDate(time) {       //时间戳转换时间    格式：yyyy-MM-dd hh:mm
    const date = new Date(time*1000);    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          
    let Y = date.getFullYear() + '-',  
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',  
        D = date.getDate() + ' ',  
        h = date.getHours() + ':',  
        m = date.getMinutes() + ':';  
        // s = date.getSeconds();     

    return Y+M+D+h+m;  
}


