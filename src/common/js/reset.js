// window.onload = function() {
//     window.addEventListener('resize', () => {
//         console.log(1233454)
//         initBodyClientSize()
//     })  

//     initBodyClientSize()
// }
      

function initBodyClientSize() {
    if ( document.documentElement.clientWidth >= 800 ) {
        // document.body.style.width = '800px'
        // document.getElementById("app").style.width = '800px'
        // document.

        document.querySelector('.ct-top-header').style.width = '800px'
        document.querySelector('.footer').style.width = '800px'
    }
}


// repeat() 函数 es5转换
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      'use strict';
      if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return '';
      }
      // 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
      // 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以：
      if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
      }
      var rpt = '';
      for (;;) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    }
  }
  