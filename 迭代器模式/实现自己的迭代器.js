// jQuery的迭代器
$.each( [1, 2, 3], function( i, n ){
  console.log( '当前下标为： '+ i );
  console.log( '当前值为:' + n );
});

// 自己实现的迭代器
var each = function( ary, callback ){
  for ( var i = 0, l = ary.length; i < l; i++ ){
    callback.call( ary[i], i, ary[ i ] ); // 把下标和元素当作参数传给callback 函数
  }
};

each( [ 1, 2, 3 ], function( i, n ){
  alert ( [ i, n ] );
});

