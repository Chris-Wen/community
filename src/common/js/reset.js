window.onload = function() {
    window.addEventListener('resize', () => {
        console.log(1233454)
        initBodyClientSize()
    })  

    initBodyClientSize()
}
      

function initBodyClientSize() {
    if ( document.documentElement.clientWidth >= 800 ) {
        // document.body.style.width = '800px'
        // document.getElementById("app").style.width = '800px'
        // document.

        document.querySelector('.ct-top-header').style.width = '800px'
        document.querySelector('.footer').style.width = '800px'
    }
}