export function addClass(el, refClass) {
    if (hasClass(el, refClass)) return;
    let newClass = el.className.split(' ')
    newClass.push(refClass)
    el.className = newClass.join(' ')
} 

export function removeClass(el, refClass) {
    if (!hasClass(el, refClass)) return;
    let oldClass = el.className.split(' ')
    if (oldClass.length == 1) return el.className = " ";

    for (let i=0; i<oldClass.length; i++) {
        if ( refClass==oldClass[i] ) {
            oldClass.splice(i, 1)
        }
    }
    el.className = oldClass.join(' ')
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function toggleClass(el, oldClass, newClass) {      
    if (!hasClass(el, oldClass)) return; 
    let nowClass = el.className.split(' ')
    if (nowClass.length == 1) return el.className = newClass;

    for (let i=0; i<nowClass.length; i++) {
        if ( oldClass==nowClass[i] ) {
            nowClass.splice(i, 1).push(newClass)
        }
    }
    el.className = nowClass.join(' ')
}


export function scrollTopFixed(dom, topDistance=0) {
    let scrollTop = document.body.scrollTop;    //页面滚动距离
    

}