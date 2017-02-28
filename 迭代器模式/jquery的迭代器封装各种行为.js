$.each = function( obj, callback ) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike( obj );
  if ( isArray ) { // 迭代类数组
    for ( ; i < length; i++ ) {
      value = callback.call( obj[ i ], i, obj[ i ] );
      if ( value === false ) {
        break;
      }
    }
  } else {
    for ( i in obj ) { // 迭代object 对象
      value = callback.call( obj[ i ], i, obj[ i ] );
      if ( value === false ) {
        break;
      }
    }
  }
  return obj;
};

