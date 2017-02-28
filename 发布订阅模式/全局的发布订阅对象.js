// 全局的Event对象实现，相当于中介，订阅者就不需要知道发布者的名字
// 把订阅者和发布者联系起来
//
var Event = (function(){
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function( key, fn ){
    if ( !clientList[ key ] ){
      clientList[ key ] = [];
    }
    clientList[ key ].push( fn );
  };

  trigger = function(){
    var key = Array.prototype.shift.call( arguments ),
      fns = clientList[ key ];
    if ( !fns || fns.length === 0 ){
      return false;
    }
    for( var i = 0, fn; fn = fns[ i++ ]; ){
      fn.apply( this, arguments );
    }
  };

  remove = function( key, fn ){
    var fns = clientList[ key ];
    if ( !fns ){
      return false;
    }
    if ( !fn ){
      fns && ( fns.length = 0 );
    }else{
      for ( var l = fns.length - 1; l >=0; l-- ){
        var _fn = fns[ l ];
        if ( _fn === fn ){
          fns.splice( l, 1 );
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})();

Event.listen( 'squareMeter88', function( price ){ // 小红订阅消息
  console.log( '价格= ' + price ); // 输出：'价格=2000000'
});

Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息

