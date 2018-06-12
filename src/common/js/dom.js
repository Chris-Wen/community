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



export function autoTextAreaHeight(dom) {         //textarea height auto set
    dom.style.height = dom.scrollTop + dom.scrollHeight + "px";  
}



export function initClientHeight(dom2, dom1=document.querySelector('.ct-top-header')) {
    let h = document.documentElement.clientHeight || document.body.clientHeight 

    if (dom1 && dom2) {
        dom2.style.height = h - dom1.offsetHeight + 'px'
    }
}

export function setClientHeight( isBottomShow = true ) {
    let h = document.documentElement.clientHeight || document.body.clientHeight 
    
    if ( document.querySelector('.ct-top-header') ) {
        if ( isBottomShow ) {
            return h - 2*document.querySelector('.ct-top-header').offsetHeight
        } else {
            return h - 2*document.querySelector('.ct-top-header').offsetHeight
        }
    }
}