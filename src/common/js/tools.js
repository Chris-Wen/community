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

