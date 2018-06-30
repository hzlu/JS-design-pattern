// 未加载真正的miniConsole.js之前的代码
// 把log请求都包裹在一个函数里，这些函数全被放入缓存队列中
var cache = [];
// 占位的miniConsole代理对象
var miniConsole = {
  log: function(){
    var args = arguments;
    cache.push( function(){
      return miniConsole.log.apply( miniConsole, args );
    });
  }
};
miniConsole.log(1);

// 当用户按下F12时才加载真正的miniConsole.js
var handler = function( ev ){
  if ( ev.keyCode === 113 ){
    var script = document.createElement( 'script' );
    script.onload = function(){
      for ( var i = 0, fn; fn = cache[ i++ ]; ){
        fn();
      }
    };
    script.src = 'miniConsole.js';
    document.getElementsByTagName( 'head' )[0].appendChild( script );
  }
};
document.body.addEventListener( 'keydown', handler, false );

// miniConsole.js 代码：
miniConsole = {
  log: function(){
    // 真正代码略
    console.log( Array.prototype.join.call( arguments ) );
  }
};

/****************************************************************************************/
/**************** 保证在F2被重复按下的时候，miniConsole.js只被加载一次 *****************/
/**************************************************************************************/

var miniConsole = (function(){
  var cache = [];
  var handler = function( ev ){
    if ( ev.keyCode === 113 ){
      var script = document.createElement( 'script' );
      script.onload = function(){
        for ( var i = 0, fn; fn = cache[ i++ ]; ){
          fn();
        }
      };
      script.src = 'miniConsole.js';
      document.getElementsByTagName( 'head' )[0].appendChild( script );
      document.body.removeEventListener( 'keydown', handler ); // 只加载一次miniConsole.js
    }
  };
  document.body.addEventListener( 'keydown', handler, false );
  return {
    log: function(){
      var args = arguments;
      cache.push( function(){
        return miniConsole.log.apply( miniConsole, args );
      });
    }
  }
})();

miniConsole.log( 11 ); // 开始打印log

// miniConsole.js 代码
miniConsole = {
  log: function(){
    // 真正代码略
    console.log( Array.prototype.join.call( arguments ) );
  }
}

