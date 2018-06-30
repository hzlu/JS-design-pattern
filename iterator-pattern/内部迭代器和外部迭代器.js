// 内部迭代器，不能自定义迭代规则
var compare = function( ary1, ary2 ){
  if ( ary1.length !== ary2.length ){
    throw new Error ( 'ary1 和ary2 不相等' );
  }
  each( ary1, function( i, n ){
    if ( n !== ary2[ i ] ){
      throw new Error ( 'ary1 和ary2 不相等' );
    }
  });
  alert ( 'ary1 和ary2 相等' );
};
compare( [ 1, 2, 3 ], [ 1, 2, 4 ] ); // throw new Error ( 'ary1 和ary2 不相等' );

// 外部迭代器
var Iterator = function( obj ){
  var current = 0;
  var next = function(){
    current += 1;
  };
  var isDone = function(){
    return current >= obj.length;
  };
  var getCurrItem = function(){
    return obj[ current ];
  };
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
};

//再看看如何改写compare 函数：
var compare = function( iterator1, iterator2 ){
  while( !iterator1.isDone() && !iterator2.isDone() ){
    if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){
      throw new Error ( 'iterator1 和iterator2 不相等' );
    }
    iterator1.next();
    iterator2.next();
  }
  alert ( 'iterator1 和iterator2 相等' );
}
var iterator1 = Iterator( [ 1, 2, 3 ] );
var iterator2 = Iterator( [ 1, 2, 3 ] );
compare( iterator1, iterator2 ); // 输出：iterator1 和iterator2 相等

