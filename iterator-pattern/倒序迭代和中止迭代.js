// 倒序迭代
var reverseEach = function( ary, callback ){
  for ( var l = ary.length - 1; l >= 0; l-- ){
    callback( l, ary[ l ] );
  }
};

reverseEach( [ 0, 1, 2 ], function( i, n ){
  console.log( n ); // 分别输出：2, 1 ,0
});

// 中止迭代器
// 如果回调函数的执行结果返回false则提前终止循环
var each = function( ary, callback ){
  for ( var i = 0, l = ary.length; i < l; i++ ){
    if ( callback( i, ary[ i ] ) === false ){ // callback 的执行结果返回false，提前终止迭代
      break;
    }
  }
};

each( [ 1, 2, 3, 4, 5 ], function( i, n ){
  if ( n > 3 ){ // n 大于3 的时候终止循环
    return false;
  }
  console.log( n ); // 分别输出：1, 2, 3
});

